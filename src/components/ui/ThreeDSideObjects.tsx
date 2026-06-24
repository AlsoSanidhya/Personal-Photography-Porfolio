import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Import original Jack portfolio assets downloaded directly from the Figma CDN
import aboutMoon from '../../assets/images/about/about-moon.png'
import aboutLego from '../../assets/images/about/about-lego.png'
import aboutObject3d from '../../assets/images/about/about-object3d.png'
import aboutGroup3d from '../../assets/images/about/about-group3d.png'

interface ThreeDObjectProps {
  type: 'moon' | 'lego' | 'object3d' | 'group3d'
}

export const ThreeDObject: React.FC<ThreeDObjectProps> = ({ type }) => {
  const [isMobile, setIsMobile] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Track viewport dimensions to apply responsive parallax multipliers
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // High-performance smooth mouse tracker
  const smoothMouseX = useSpring(mouseX, { stiffness: 85, damping: 26 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 85, damping: 26 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinate offsets relative to screen center (-1 to 1)
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Parallax translation bounds (scaled smaller on mobile to keep within layout margins)
  const range = isMobile ? 12 : 26
  const x = useTransform(smoothMouseX, (val) => val * range)
  const y = useTransform(smoothMouseY, (val) => val * range)

  // Map types to exact CDN assets, layout alt texts, and floating settings
  const assetMap = {
    moon: { src: aboutMoon, alt: 'Jack Moon Object', duration: 7, delay: 0 },
    lego: { src: aboutLego, alt: 'Jack Lego Object', duration: 6, delay: 0.4 },
    object3d: { src: aboutObject3d, alt: 'Jack 3D Object', duration: 8, delay: 0.2 },
    group3d: { src: aboutGroup3d, alt: 'Jack 3D Group', duration: 7.5, delay: 0.6 }
  }

  const active = assetMap[type]

  // Float animation sequence (using Framer Motion keyframes)
  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: active.duration,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: active.delay
    }
  }

  return (
    <motion.div
      style={{ x, y }}
      animate={floatAnimation}
      className="w-full h-full flex items-center justify-center select-none pointer-events-none overflow-visible"
    >
      <img
        src={active.src}
        alt={active.alt}
        className="w-full h-full object-contain opacity-75 mix-blend-screen"
        style={{
          background: 'transparent',
          boxShadow: 'none',
          border: 'none',
          filter: 'none'
        }}
      />
    </motion.div>
  )
}

export default ThreeDObject
