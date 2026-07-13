import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import type { GalleryItem } from '../data/portfolioData'
import FadeIn from '../components/ui/FadeIn'
import ParallaxText from '../components/ui/ParallaxText'
import GalleryLightbox from '../components/ui/GalleryLightbox'

export const GallerySection: React.FC = () => {
  const { gallery } = PORTFOLIO_DATA
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null)

  return (
    <section
      id="gallery"
      className="relative bg-transparent text-[#F5F1E8] px-5 sm:px-8 md:px-10 py-32 md:py-44 z-20 select-none border-t border-[#F5F1E8]/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <FadeIn y={40} className="mb-6">
          <ParallaxText baseY={60}>
            <h2 className="hero-heading font-serif font-medium uppercase tracking-[0.05em] leading-none text-center text-[3.5rem] sm:text-[8vw] md:text-[10vw] lg:text-[130px]">
              Gallery
            </h2>
          </ParallaxText>
        </FadeIn>

        {/* Elegant Subtitle */}
        <FadeIn y={30} delay={0.15} className="mb-20 text-center max-w-xl">
          <p className="font-sans font-light tracking-[0.14em] text-[#B8B1A6] text-xs sm:text-sm uppercase leading-relaxed">
            A curated collection of my favorite photographs.
          </p>
        </FadeIn>

        {/* Masonry Image Grid using Tailwind Columns */}
        <div className="w-full columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {gallery.map((item: GalleryItem, index: number) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.94, y: 35 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                whileTap={{ scale: 0.98 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="gallery-card cursor-pointer break-inside-avoid relative group overflow-hidden rounded-2xl border border-[#F5F1E8]/5 shadow-2xl aspect-[4/5] sm:aspect-auto"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                  style={{ opacity: 0 }}
                  className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-102 content-visibility-auto"
                />
                
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={gallery}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}

export default GallerySection
