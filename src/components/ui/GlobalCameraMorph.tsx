import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { usePerformanceTier } from '../../hooks/usePerformanceTier'
import { useScroll } from 'framer-motion'

interface GlobalCameraMorphProps {
  isReveal?: boolean
}

export const GlobalCameraMorph: React.FC<GlobalCameraMorphProps> = React.memo(({ isReveal = true }) => {
  const { scrollYProgress: scrollProgress } = useScroll()
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const performanceTier = usePerformanceTier()
  const [reducedMotion, setReducedMotion] = React.useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    // Track mouse coordinates for tilt parallax (throttled to 30fps)
    let lastMouseMoveTime = 0
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastMouseMoveTime < 33) return // ~30fps
      lastMouseMoveTime = now
      
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    // Scene setup
    const scene = new THREE.Scene()
    
    // Camera setup with high far plane to prevent clipping
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 500)
    camera.position.z = 5.0

    // WebGL Renderer with capped pixel ratio (1.5) for performance
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: performanceTier !== 'low'
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    const pixelRatioMap = {
      high: Math.min(window.devicePixelRatio, 1.5),
      mid: Math.min(window.devicePixelRatio, 1.0),
      low: 1.0
    }
    renderer.setPixelRatio(pixelRatioMap[performanceTier])

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0a0a0c)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(0xffffff, 4.0)
    mainLight.position.set(1.5, 3.5, 2.5)
    scene.add(mainLight)

    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 3.5) // Soft purple glow light
    rimLight.position.set(-2, -3.5, 1)
    scene.add(rimLight)

    // Master Group (all meshes inside)
    const masterGroup = new THREE.Group()
    scene.add(masterGroup)

    // --- GEOMETRIES (Complexity reduced by 70%+) ---
    // 1. Concentric rings (glowing ring structure)
    const ringGeom1 = new THREE.TorusGeometry(1.2, 0.035, 8, 48)
    const ringGeom2 = new THREE.TorusGeometry(1.0, 0.02, 8, 48)
    const ringGeomGlow = new THREE.TorusGeometry(1.2, 0.04, 8, 48)

    // 2. Lens Barrel Cylinders
    const outerCylinderGeom = new THREE.CylinderGeometry(1.15, 1.15, 0.25, 24, 1, true)
    const innerCylinderGeom = new THREE.CylinderGeometry(0.95, 0.95, 0.15, 24, 1, true)
    const frontBezelGeom = new THREE.RingGeometry(0.95, 1.15, 24)

    // 3. Front Glass Element (spherical cap)
    const lensGlassGeom = new THREE.SphereGeometry(0.85, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.32)

    // 4. Aperture Blade Geometry
    const bladeGeometry = new THREE.BoxGeometry(0.35, 0.12, 0.005)

    // --- MATERIALS (Single-purpose, shared to minimize draw calls) ---
    const isLowEnd = performanceTier === 'low'

    const glassMaterial = isLowEnd ? new THREE.MeshStandardMaterial({
      color: 0x141416,
      roughness: 0.12,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    }) : new THREE.MeshPhysicalMaterial({
      color: 0x141416,
      transmission: 0.96,
      roughness: 0.12,
      thickness: 0.35,
      ior: 1.55,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    })

    const emissiveMaterial = new THREE.MeshBasicMaterial({
      color: 0xa78bfa, // soft violet glow
      transparent: true,
      opacity: (window.innerWidth < 768) ? 0.3 : 0.8, // reduced on mobile to save GPU fill rate
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    })

    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x28282c, // Dark Leica titanium
      metalness: 0.95,
      roughness: 0.22,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide
    })

    const bladeMaterial = new THREE.MeshStandardMaterial({
      color: 0x111112, // Carbon dark graphite
      metalness: 0.85,
      roughness: 0.35,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide
    })

    const lensGlassMaterial = isLowEnd ? new THREE.MeshStandardMaterial({
      color: 0x4c1d95,
      roughness: 0.01,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide
    }) : new THREE.MeshPhysicalMaterial({
      color: 0x4c1d95,
      transmission: 0.98,
      roughness: 0.01,
      thickness: 0.12,
      ior: 1.62,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide
    })

    // --- MESH ASSEMBLY ---
    // Assemble Rings
    const ringMesh1 = new THREE.Mesh(ringGeom1, glassMaterial)
    const ringMesh2 = new THREE.Mesh(ringGeom2, glassMaterial)
    const glowRingMesh = new THREE.Mesh(ringGeomGlow, emissiveMaterial)
    
    const ringsGroup = new THREE.Group()
    ringsGroup.add(ringMesh1)
    ringsGroup.add(ringMesh2)
    ringsGroup.add(glowRingMesh)
    masterGroup.add(ringsGroup)

    // Assemble Lens Barrel (Titanium)
    const outerCylinder = new THREE.Mesh(outerCylinderGeom, titaniumMaterial)
    outerCylinder.rotation.x = Math.PI / 2
    
    const innerCylinder = new THREE.Mesh(innerCylinderGeom, titaniumMaterial)
    innerCylinder.rotation.x = Math.PI / 2

    const frontBezel = new THREE.Mesh(frontBezelGeom, titaniumMaterial)
    
    const cylinderGroup = new THREE.Group()
    cylinderGroup.add(outerCylinder)
    cylinderGroup.add(innerCylinder)
    cylinderGroup.add(frontBezel)
    masterGroup.add(cylinderGroup)

    // Assemble Front Glass Element
    const lensGlassMesh = new THREE.Mesh(lensGlassGeom, lensGlassMaterial)
    lensGlassMesh.position.z = 0.08
    masterGroup.add(lensGlassMesh)

    // Assemble Instanced Aperture Blades
    const numBlades = 8
    const bladesGroup = new THREE.Group()
    const instancedBlades = new THREE.InstancedMesh(bladeGeometry, bladeMaterial, numBlades)
    bladesGroup.add(instancedBlades)
    masterGroup.add(bladesGroup)

    // Instanced matrices math
    const tempMatrix = new THREE.Matrix4()
    const tempPosition = new THREE.Vector3()
    const tempRotation = new THREE.Quaternion()
    const tempScale = new THREE.Vector3(1, 1, 1)

    const updateBlades = (currentBladeAngle: number) => {
      for (let i = 0; i < numBlades; i++) {
        const angle = (i * Math.PI * 2) / numBlades
        const radius = 0.62
        
        // Pivot coordinates
        const px = Math.cos(angle) * radius
        const py = Math.sin(angle) * radius
        const pz = -0.02

        // Rotate local tangent + scroll rotation
        const rotZ = angle + Math.PI / 2 + currentBladeAngle
        
        // Blade offset along local X axis from pivot
        const offsetDist = 0.15
        const bx = px + Math.cos(rotZ) * offsetDist
        const by = py + Math.sin(rotZ) * offsetDist
        const bz = pz

        tempPosition.set(bx, by, bz)
        tempRotation.setFromAxisAngle(new THREE.Vector3(0, 0, 1), rotZ)
        
        tempMatrix.compose(tempPosition, tempRotation, tempScale)
        instancedBlades.setMatrixAt(i, tempMatrix)
      }
      instancedBlades.instanceMatrix.needsUpdate = true
    }

    // Animation & State Loop variables
    let currentTiltX = 0
    let currentTiltY = 0
    let idleRotation = 0

    let isScrolling = false
    let scrollTimeout: ReturnType<typeof setTimeout>
    const handleScroll = () => {
      isScrolling = true
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
      }, 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    let lastProgress = -1

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render)

      const progress = scrollProgress.get()
      const isProgressChanged = Math.abs(progress - lastProgress) > 0.0001
      
      // If we are far down the page (progress > 0.9) and not scrolling, we can optionally throttle.
      // But we must render if progress changed.
      
      // Calculate morph state
      lastProgress = progress

      // --- SCROLL MORPH MATH ---
      const ringsOpacity = 1.0
      let ringsScaleVal: number
      let bladesOpacity = 0.0
      let bladesAngle = 0.6 // closed
      let barrelOpacity = 0.0
      let barrelZOffset = 0.4 // exploded view offset
      let lensGlassOpacity = 0.0

      // 1. 0% to 15% scroll: ring starts opening
      if (progress < 0.15) {
        const t = progress / 0.15
        ringsScaleVal = 1.0 + t * 0.15
      } else {
        ringsScaleVal = 1.15
      }

      // 2. 15% to 30% scroll: aperture blades appear & slide open
      if (progress >= 0.15 && progress < 0.3) {
        const t = (progress - 0.15) / 0.15
        bladesOpacity = t
        bladesAngle = 0.6 - t * 0.6 // slides blades from closed to open
      } else if (progress >= 0.3) {
        bladesOpacity = 1.0
        bladesAngle = 0.0
      }

      // 3. 30% to 50% scroll: titanium cylinders silhouette forms (exploded view slides in)
      if (progress >= 0.3 && progress < 0.5) {
        const t = (progress - 0.3) / 0.2
        barrelOpacity = t
        barrelZOffset = 0.4 - t * 0.4
      } else if (progress >= 0.5) {
        barrelOpacity = 1.0
        barrelZOffset = 0.0
      }

      // 4. 50% to 70% scroll: recognizable camera/lens elements fade in
      if (progress >= 0.5 && progress < 0.7) {
        const t = (progress - 0.5) / 0.2
        lensGlassOpacity = t
      } else if (progress >= 0.7) {
        lensGlassOpacity = 1.0
      }

      // 5. Overall scroll progress maps to continuous scale and Z-axis rotation depth
      const easeT = progress * progress * (3 - 2 * progress) // smooth cubic ease-in-out
      const scrollScale = 1.0 + easeT * 0.35
      const scrollRotZ = easeT * (25 * Math.PI / 180)

      // Update material transparency
      glassMaterial.opacity = 0.9 * ringsOpacity
      bladeMaterial.opacity = bladesOpacity
      titaniumMaterial.opacity = barrelOpacity
      lensGlassMaterial.opacity = 0.95 * lensGlassOpacity

      // Dynamic Z slide offsets for exploded assembly transition
      outerCylinder.position.z = 0.05 + barrelZOffset
      innerCylinder.position.z = -0.02 - barrelZOffset
      frontBezel.position.z = 0.12 + barrelZOffset

      // Apply computed blade transformations to InstancedMesh
      if (isProgressChanged) {
        updateBlades(bladesAngle)
      }

      // --- CONTINUOUS IDLE ANIMATIONS ---
      if (!reducedMotion) {
        idleRotation += (window.innerWidth < 768 ? 0.0008 : 0.0014) // Reduced speed
      }
      const idleTime = time * 0.001

      // 1. Subtle breathing emissive glow
      if (!reducedMotion) {
        emissiveMaterial.opacity = (window.innerWidth < 768 ? 0.2 : 0.35) + Math.sin(idleTime * 2.0) * (window.innerWidth < 768 ? 0.05 : 0.20)
      }

      // 2. Slow rotation of outer lens and blades groups
      ringsGroup.rotation.z = idleRotation
      ringsGroup.scale.set(ringsScaleVal, ringsScaleVal, ringsScaleVal)
      
      if (!reducedMotion) {
        glowRingMesh.rotation.z = -idleRotation * 0.5
        bladesGroup.rotation.z = -idleRotation * 0.35
        cylinderGroup.rotation.z = idleRotation * 0.18

        // 3. Subtle floating motion (Y-axis translation)
        if (!isScrolling) {
          masterGroup.position.y = Math.sin(idleTime * 1.4) * 0.08
          masterGroup.position.x = Math.cos(idleTime * 0.9) * 0.04
        }
      }

      // --- SCROLL TRANSFORM APPLIED ---
      masterGroup.scale.set(scrollScale, scrollScale, scrollScale)

      // --- MICRO PARALLAX (MOUSE TILT) ---
      const targetTiltX = mouseRef.current.y * 0.18
      const targetTiltY = mouseRef.current.x * 0.18
      currentTiltX += (targetTiltX - currentTiltX) * 0.05
      currentTiltY += (targetTiltY - currentTiltY) * 0.05

      // Combine cursor tilt and scroll rotation on the master group
      masterGroup.rotation.x = currentTiltX
      masterGroup.rotation.y = currentTiltY
      masterGroup.rotation.z = scrollRotZ

      // Custom mobile shift and opacity check
      if (containerRef.current) {
        const isMobile = window.innerWidth <= 768
        if (isMobile) {
          let targetOpacity = 1.0
          let targetTranslateY = 0
          
          if (progress < 0.15) {
            targetOpacity = 1.0
            targetTranslateY = 0
          } else if (progress >= 0.15 && progress < 0.35) {
            const t = (progress - 0.15) / 0.20
            targetOpacity = 1.0 - t // 1.0 -> 0.0
            targetTranslateY = t * 120 // moves down by 120px
          } else {
            targetOpacity = 0.0
            targetTranslateY = 120
          }
          
          containerRef.current.style.opacity = `${targetOpacity * (isReveal ? 1 : 0)}`
          containerRef.current.style.transform = `translate3d(-50%, calc(-50% + ${targetTranslateY}px), 0)`
        } else {
          containerRef.current.style.opacity = isReveal ? '1' : '0'
          containerRef.current.style.transform = 'translate3d(-50%, -50%, 0)'
        }
      }

      // Render only if something changed or we are idling visibly
      if (isProgressChanged || (!isScrolling && !reducedMotion)) {
        renderer.render(scene, camera)
      }
    }

    let animationFrameId = requestAnimationFrame(render)

    // Resize Handler
    const handleResize = () => {
      if (!container || !canvas) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.position.z = 5.0
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)

      // Dispose resources
      ringGeom1.dispose()
      ringGeom2.dispose()
      ringGeomGlow.dispose()
      outerCylinderGeom.dispose()
      innerCylinderGeom.dispose()
      frontBezelGeom.dispose()
      lensGlassGeom.dispose()
      bladeGeometry.dispose()

      glassMaterial.dispose()
      emissiveMaterial.dispose()
      titaniumMaterial.dispose()
      bladeMaterial.dispose()
      lensGlassMaterial.dispose()

      instancedBlades.dispose()
      renderer.dispose()
    }
  }, [scrollProgress, performanceTier])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'translate3d(-50%, -50%, 0)',
        opacity: isReveal ? 1 : 0,
        transition: 'opacity 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.8s'
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }} />
    </div>
  )
})

export default GlobalCameraMorph
