import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface CharProps {
  char: string
  progress: MotionValue<number>
  start: number
  end: number
}

const AnimatedChar: React.FC<CharProps> = ({ char, progress, start, end }) => {
  const opacity = useTransform(progress, [start, end], [0.35, 1])
  return (
    <span className="relative inline-block">
      <span className="opacity-0">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {char}
      </motion.span>
    </span>
  )
}

interface AnimatedTextProps {
  text: string
  className?: string
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.15']
  })

  // Split into paragraphs to preserve newlines
  const paragraphs = text.split('\n')
  
  // Calculate total characters for progress calculations
  const plainText = text.replace(/\n/g, '')
  const totalLength = plainText.length

  let charIndex = 0

  return (
    <div ref={containerRef} className={`flex flex-col gap-6 text-center items-center ${className}`}>
      {paragraphs.map((paragraph, pIdx) => {
        if (paragraph.trim() === '') {
          return <div key={`space-${pIdx}`} className="h-4" />
        }

        const words = paragraph.split(' ')

        return (
          <p key={`p-${pIdx}`} className="flex flex-wrap justify-center gap-x-[0.25em] gap-y-1">
            {words.map((word, wIdx) => {
              const chars = word.split('')
              return (
                <span key={`w-${wIdx}`} className="inline-block whitespace-nowrap">
                  {chars.map((char, cIdx) => {
                    const currentIndex = charIndex
                    charIndex++
                    
                    const start = currentIndex / totalLength
                    const end = (currentIndex + 1) / totalLength

                    return (
                      <AnimatedChar
                        key={`c-${cIdx}`}
                        char={char}
                        progress={scrollYProgress}
                        start={start}
                        end={end}
                      />
                    )
                  })}
                </span>
              )
            })}
          </p>
        )
      })}
    </div>
  )
}

export default AnimatedText
