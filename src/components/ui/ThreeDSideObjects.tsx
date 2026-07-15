import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Import original photography files selected by script
import aboutMoon from '../../assets/images/about/about-moon.jpg'
import aboutLego from '../../assets/images/about/about-lego.jpg'
import aboutObject3d from '../../assets/images/about/about-object3d.jpg'
import aboutGroup3d from '../../assets/originals/gallery/DSC_0700.webp'

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

  // Map types to exact assets, layout alt texts, and floating settings
  const assetMap = {
    moon: { src: aboutMoon, alt: 'Portfolio Image 1', duration: 7, delay: 0 },
    lego: { src: aboutLego, alt: 'Portfolio Image 2', duration: 6, delay: 0.4 },
    object3d: { src: aboutObject3d, alt: 'Portfolio Image 3', duration: 8, delay: 0.2 },
    group3d: { src: aboutGroup3d, alt: 'Portfolio Image 4', duration: 7.5, delay: 0.6 }
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
      <div 
        className="relative w-[90%] h-[90%] bg-[#0c0c0c]/90 backdrop-blur-md border border-[#F5F1E8]/10 p-2 pb-4 sm:p-2.5 sm:pb-5 rounded-xl shadow-2xl overflow-hidden flex flex-col gap-2"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(139, 92, 246, 0.04)',
          transform: type === 'moon' || type === 'object3d' ? 'rotate(-3.5deg)' : 'rotate(3.5deg)',
          pointerEvents: 'auto'
        }}
      >
        <div className="w-full flex-grow rounded-lg overflow-hidden bg-black/40 aspect-[4/3] sm:aspect-auto">
          <img
            src={active.src}
            alt={active.alt}
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
            loading="lazy"
          />
        </div>
        <div className="flex justify-between items-center px-1 leading-none select-none">
          <span className="font-serif text-[8px] sm:text-[9px] tracking-[0.1em] text-[#B8B1A6] uppercase">
            {type === 'moon' ? 'Perspective' : type === 'lego' ? 'Detail' : type === 'object3d' ? 'Focus' : 'Composition'}
          </span>
          <span className="font-sans text-[7px] sm:text-[8px] text-[#B8B1A6]/30">
            {type === 'moon' ? '01' : type === 'lego' ? '02' : type === 'object3d' ? '03' : '04'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default ThreeDObject
