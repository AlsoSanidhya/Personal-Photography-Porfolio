import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'

interface GlobalAvatarMascotProps {
  scrollProgress: MotionValue<number>
}

// Client-side chroma-key helper to dynamically clear out dark vignette borders and make the background transparent
const clearVignetteBackground = (img: HTMLImageElement): string => {
  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) return img.src
  
  ctx.drawImage(img, 0, 0)
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imgData.data
  
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const maxDist = Math.sqrt(centerX * centerX + centerY * centerY)
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    
    // Pixel coordinates
    const pixelIndex = i / 4
    const py = Math.floor(pixelIndex / canvas.width)
    const px = pixelIndex % canvas.width
    
    // Normalized distance from center (0.0 to 1.0)
    const dx = px - centerX
    const dy = py - centerY
    const dist = Math.sqrt(dx * dx + dy * dy) / maxDist
    
    // We scale the darkness threshold based on the distance from the center.
    // Near the center (avatar body), we use a minimal threshold to prevent hoodie holes.
    // Near the corners/edges, we use a higher threshold to clear the vignette background.
    const threshold = dist < 0.35 ? 12 : 12 + (dist - 0.35) * 65
    
    if (r < threshold && g < threshold && b < threshold * 1.25) {
      const maxVal = Math.max(r, g, b)
      // Soft transition feathering for alpha
      const alpha = dist < 0.4 ? 255 : Math.min(255, Math.max(0, Math.floor((maxVal / threshold) * 255)))
      data[i + 3] = alpha
    }
    
    // Force fade-to-zero transparency at outer margins/corners to prevent bounding box edge lines
    if (dist > 0.72) {
      const edgeFactor = Math.max(0, (1.0 - dist) / (1.0 - 0.72))
      data[i + 3] = Math.floor(data[i + 3] * edgeFactor)
    }
  }
  
  ctx.putImageData(imgData, 0, 0)
  return canvas.toDataURL('image/png')
}

export const GlobalAvatarMascot: React.FC<GlobalAvatarMascotProps> = ({ scrollProgress }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [avatarSrc, setAvatarSrc] = useState<string>('/avatar.png')

  // Track responsive screen sizing & process image on mount
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    // Process local avatar image to remove square vignette background
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = '/avatar.png'
    img.onload = () => {
      try {
        const transparentDataUrl = clearVignetteBackground(img)
        setAvatarSrc(transparentDataUrl)
      } catch (err) {
        console.error('Error removing avatar background vignette:', err)
      }
    }

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 1. Raw scroll transformations for mascot states
  // 0% scroll: centered (0, 0), scale 1.0
  // 10-20% scroll: top-left (-28vw, -25vh), scale 0.9, rotate 12deg
  // 30-40% scroll: bottom-right (28vw, 25vh), scale 1.05, rotate -8deg
  // 50-60% scroll: left-center (-24vw, 0vh), scale 0.98, rotate 6deg
  // 70-80% scroll: upper-right (24vw, -22vh), scale 1.10, rotate -10deg
  // 90-100% scroll: lower-left (-28vw, 25vh), scale 0.95, rotate 0deg
  const rawX = useTransform(
    scrollProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.95, 1.0],
    [0, -28, 28, -24, 24, -28, -28]
  )
  const rawY = useTransform(
    scrollProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.95, 1.0],
    [0, -25, 25, 0, -22, 25, 25]
  )
  const rawScale = useTransform(
    scrollProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.95, 1.0],
    [1.0, 0.9, 1.05, 0.98, 1.10, 0.95, 0.95]
  )
  const rawRotate = useTransform(
    scrollProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.95, 1.0],
    [0, 12, -8, 6, -10, 0, 0]
  )

  // 2. High-performance spring interpolation to absorb scroll ticks and create fluid, organic motion
  const springConfig = { damping: 30, stiffness: 60, mass: 0.8 }
  const smoothX = useSpring(rawX, springConfig)
  const smoothY = useSpring(rawY, springConfig)
  const smoothScale = useSpring(rawScale, springConfig)
  const smoothRotate = useSpring(rawRotate, springConfig)

  // Responsive scaling multipliers
  const multiplier = isMobile ? 0.65 : 1.0
  const scaleMultiplier = isMobile ? 0.75 : 1.0

  const translateX = useTransform(smoothX, (val) => `${val * multiplier}vw`)
  const translateY = useTransform(smoothY, (val) => `${val * multiplier}vh`)
  const scale = useTransform(smoothScale, (val) => val * scaleMultiplier)

  // 3. Mouse-parallax calculations (driven by MotionValues to avoid React layout rerenders)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 120 })
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 120 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Map mouse positions to small displacements for each 2.5D layer
  const bodyParallaxX = useTransform(smoothMouseX, [-1, 1], [-4, 4])
  const bodyParallaxY = useTransform(smoothMouseY, [-1, 1], [-4, 4])

  const headParallaxX = useTransform(smoothMouseX, [-1, 1], [-8, 8])
  const headParallaxY = useTransform(smoothMouseY, [-1, 1], [-8, 8])

  const cameraParallaxX = useTransform(smoothMouseX, [-1, 1], [-14, 14])
  const cameraParallaxY = useTransform(smoothMouseY, [-1, 1], [-14, 14])

  // Continuous breathing and idle floating keyframes
  const floatAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[45] flex items-center justify-center overflow-visible select-none">
      {/* Scroll-driven outer transform wrapper */}
      <motion.div
        style={{
          x: translateX,
          y: translateY,
          scale: scale,
          rotate: smoothRotate,
          willChange: 'transform'
        }}
        className="relative w-[280px] sm:w-[350px] md:w-[420px] lg:w-[480px] aspect-square flex items-center justify-center overflow-visible"
      >
        {/* Continuous breathing floating wrapper */}
        <motion.div animate={floatAnimation} className="relative w-full h-full overflow-visible">
          {/* Layer 1: Body (Full background silhouette layer) */}
          <motion.div
            style={{
              x: bodyParallaxX,
              y: bodyParallaxY,
              willChange: 'transform'
            }}
            className="absolute inset-0"
          >
            <img
              src={avatarSrc}
              alt="Mascot Body Layer"
              className="w-full h-full object-contain mix-blend-screen opacity-95 pointer-events-none"
            />
          </motion.div>

          {/* Layer 2: Head (Overlapping cut-out shifting slightly more) */}
          <motion.div
            style={{
              x: headParallaxX,
              y: headParallaxY,
              willChange: 'transform'
            }}
            className="absolute inset-0 overflow-visible"
          >
            <img
              src={avatarSrc}
              alt="Mascot Head Layer"
              style={{
                maskImage: 'linear-gradient(to bottom, black 0%, black 16%, transparent 26%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 16%, transparent 26%)'
              }}
              className="w-full h-full object-contain mix-blend-screen opacity-95 pointer-events-none"
            />
          </motion.div>

          {/* Layer 3: Camera (Overlapping cut-out shifting the most) */}
          <motion.div
            style={{
              x: cameraParallaxX,
              y: cameraParallaxY,
              willChange: 'transform'
            }}
            className="absolute inset-0 overflow-visible"
          >
            <img
              src={avatarSrc}
              alt="Mascot Camera Layer"
              style={{
                maskImage: 'radial-gradient(circle 22% at 38% 58%, black 15%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle 22% at 38% 58%, black 15%, transparent 100%)'
              }}
              className="w-full h-full object-contain mix-blend-screen opacity-95 pointer-events-none"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default GlobalAvatarMascot
