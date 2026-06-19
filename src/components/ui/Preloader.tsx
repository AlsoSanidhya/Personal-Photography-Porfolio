import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [expand, setExpand] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setExpand(true)
          return 100
        }
        // Premium organic counting speed
        const increment = Math.floor(Math.random() * 3) + 1
        return Math.min(100, prev + increment)
      })
    }, 40)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute rounded-full bg-white shadow-[0_0_35px_rgba(255,255,255,0.95)]"
        animate={
          expand
            ? {
                scale: 350,
                y: 0,
              }
            : {
                y: [0, -100, 0],
                scaleX: [1, 0.88, 1.12, 1],
                scaleY: [1, 1.12, 0.88, 1],
              }
        }
        transition={
          expand
            ? {
                type: 'spring',
                stiffness: 40,
                damping: 15,
                restDelta: 0.01,
              }
            : {
                y: {
                  duration: 0.9,
                  repeat: Infinity,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
                scaleX: {
                  duration: 0.9,
                  repeat: Infinity,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
                scaleY: {
                  duration: 0.9,
                  repeat: Infinity,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }
        }
        onAnimationComplete={() => {
          if (expand) {
            onComplete()
          }
        }}
        style={{
          width: 20,
          height: 20,
        }}
      />
      <div className="absolute bottom-20 text-zinc-400 text-2xl tracking-[0.2em] font-light font-sans select-none">
        {progress}%
      </div>
    </motion.div>
  )
}

export default Preloader