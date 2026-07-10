import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import type { GalleryItem } from '../data/portfolioData'
import FadeIn from '../components/ui/FadeIn'
import ParallaxText from '../components/ui/ParallaxText'

export const GallerySection: React.FC = () => {
  const { gallery } = PORTFOLIO_DATA

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
            {gallery.map((item: GalleryItem) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.94, y: 35 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
                key={item.id}
                className="gallery-card break-inside-avoid relative group overflow-hidden rounded-2xl border border-[#F5F1E8]/5 shadow-2xl aspect-[4/5] sm:aspect-auto"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                />
                
                {/* Hover overlay with layout info */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#F5F1E8]">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default GallerySection
