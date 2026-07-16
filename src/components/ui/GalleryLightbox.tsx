import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryItem } from '../../data/portfolioData'

interface GalleryLightboxProps {
  images: GalleryItem[]
  initialIndex: number
  onClose: () => void
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [direction, setDirection] = useState(0)

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1 === images.length ? 0 : prev + 1))
  }, [images.length])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 < 0 ? images.length - 1 : prev - 1))
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrev, onClose])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center touch-pan-y"
        style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 text-[#F5F1E8]/50 hover:text-[#F5F1E8] transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        <button
          onClick={handlePrev}
          className="absolute left-4 z-50 p-4 hidden md:block text-[#F5F1E8]/50 hover:text-[#F5F1E8] transition-colors"
        >
          <ChevronLeft className="w-10 h-10" />
        </button>

        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex].imageUrl}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)

                if (swipe < -swipeConfidenceThreshold) {
                  handleNext()
                } else if (swipe > swipeConfidenceThreshold) {
                  handlePrev()
                }
              }}
              className="absolute max-w-[100vw] max-h-[100dvh] md:max-w-[90vw] md:max-h-[90vh] object-contain select-none pointer-events-auto"
              draggable={false}
            />
          </AnimatePresence>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 z-50 p-4 hidden md:block text-[#F5F1E8]/50 hover:text-[#F5F1E8] transition-colors"
        >
          <ChevronRight className="w-10 h-10" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#B8B1A6] font-sans text-sm tracking-widest">
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default GalleryLightbox
