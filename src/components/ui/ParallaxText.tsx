import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface ParallaxTextProps {
  children: React.ReactNode
  className?: string
  baseY?: number
}

export const ParallaxText: React.FC<ParallaxTextProps> = ({
  children,
  className = '',
  baseY = 50
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Smooth out the scroll progress using spring physics for a premium cinematic momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  })

  const distance = isMobile ? baseY * 0.4 : baseY
  // Translate from negative distance to positive distance over viewport scroll span
  const y = useTransform(smoothProgress, [0, 1], [-distance, distance])

  return (
    <div ref={ref} className="overflow-visible w-full flex justify-center items-center">
      <motion.div style={{ y, z: 0, backfaceVisibility: 'hidden', willChange: 'transform' }} className={className}>
        {children}
      </motion.div>
    </div>
  )
}

export default ParallaxText
