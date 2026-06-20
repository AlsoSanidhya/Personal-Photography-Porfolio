import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'

interface GlobalAvatarMascotProps {
  scrollProgress: MotionValue<number>
}

export const GlobalAvatarMascot: React.FC<GlobalAvatarMascotProps> = ({ scrollProgress }) => {
  const [isMobile, setIsMobile] = useState(false)

  // Track responsive screen sizing on mount
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
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
  const smoothMouseX = useSpring(mouseX, { stiffness: 80, damping: 25 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 80, damping: 25 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Raw pixel difference from screen center
      const x = e.clientX - window.innerWidth / 2
      const y = e.clientY - window.innerHeight / 2
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Map mouse positions to small displacements for each 2.5D layer
  // Maximum translateX: ±10px, Maximum translateY: ±6px
  const bodyParallaxX = useTransform(smoothMouseX, (x) => Math.max(-3, Math.min(3, x * 0.004)))
  const bodyParallaxY = useTransform(smoothMouseY, (y) => Math.max(-2, Math.min(2, y * 0.004)))

  const headParallaxX = useTransform(smoothMouseX, (x) => Math.max(-7, Math.min(7, x * 0.009)))
  const headParallaxY = useTransform(smoothMouseY, (y) => Math.max(-4, Math.min(4, y * 0.009)))

  const cameraParallaxX = useTransform(smoothMouseX, (x) => Math.max(-10, Math.min(10, x * 0.014)))
  const cameraParallaxY = useTransform(smoothMouseY, (y) => Math.max(-6, Math.min(6, y * 0.014)))

  // Subtle 3D looking-towards-cursor tilt (clamped to max ±5deg Y, ±3deg X)
  const rotateY = useTransform(smoothMouseX, (x) => {
    const val = x * 0.01
    return Math.max(-5, Math.min(5, val))
  })
  const rotateX = useTransform(smoothMouseY, (y) => {
    const val = -y * 0.006 // Negate to tilt towards mouse
    return Math.max(-3, Math.min(3, val))
  })

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
    <div 
      style={{ perspective: '800px' }}
      className="fixed inset-0 pointer-events-none z-[45] flex items-center justify-center overflow-visible select-none"
    >
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
        {/* Continuous breathing floating wrapper with subtle 3D cursor tilt */}
        <motion.div 
          animate={floatAnimation} 
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d'
          }}
          className="relative w-full h-full overflow-visible"
        >
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
              src="/avatar.png"
              alt="Mascot Body Layer"
              style={{
                background: 'transparent',
                boxShadow: 'none',
                border: 'none',
                filter: 'none'
              }}
              className="w-full h-full object-contain opacity-95 pointer-events-none"
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
              src="/avatar.png"
              alt="Mascot Head Layer"
              style={{
                background: 'transparent',
                boxShadow: 'none',
                border: 'none',
                filter: 'none',
                maskImage: 'linear-gradient(to bottom, black 0%, black 16%, transparent 26%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 16%, transparent 26%)'
              }}
              className="w-full h-full object-contain opacity-95 pointer-events-none"
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
              src="/avatar.png"
              alt="Mascot Camera Layer"
              style={{
                background: 'transparent',
                boxShadow: 'none',
                border: 'none',
                filter: 'none',
                maskImage: 'radial-gradient(circle 22% at 38% 58%, black 15%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle 22% at 38% 58%, black 15%, transparent 100%)'
              }}
              className="w-full h-full object-contain opacity-95 pointer-events-none"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default GlobalAvatarMascot
