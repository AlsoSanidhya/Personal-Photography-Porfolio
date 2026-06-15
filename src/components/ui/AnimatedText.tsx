import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null)
  
  // Set up useScroll targeting the paragraph element with specified offsets
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  })

  const characters = text.split('')

  return (
    <p ref={containerRef} className={`relative flex flex-wrap justify-center ${className}`}>
      {characters.map((char, index) => {
        // Compute range for each character's reveal timeline
        const start = index / characters.length
        const end = (index + 1) / characters.length
        
        // Transform the scroll position to opacity between 0.2 and 1
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])

        return (
          <span key={index} className="relative inline-block whitespace-pre">
            {/* Invisible placeholder for sizing */}
            <span className="opacity-0">{char}</span>
            {/* Absolute positioned animated span */}
            <motion.span style={{ opacity }} className="absolute inset-0">
              {char}
            </motion.span>
          </span>
        )
      })}
    </p>
  )
}

export default AnimatedText
