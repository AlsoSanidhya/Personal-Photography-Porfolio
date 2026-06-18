import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import type { GalleryItem } from '../data/portfolioData'
import FadeIn from '../components/ui/FadeIn'
import ParallaxText from '../components/ui/ParallaxText'

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Portraits' | 'Street' | 'Landscapes' | 'Edits'>('All')
  const { gallery } = PORTFOLIO_DATA

  const filteredItems = activeFilter === 'All'
    ? gallery
    : gallery.filter(item => item.category === activeFilter)

  const filters: ('All' | 'Portraits' | 'Street' | 'Landscapes' | 'Edits')[] = [
    'All', 'Portraits', 'Street', 'Landscapes', 'Edits'
  ]

  return (
    <section
      id="gallery"
      className="relative bg-[#050505] text-[#F5F1E8] px-5 sm:px-8 md:px-10 py-32 md:py-44 z-20 select-none border-t border-[#F5F1E8]/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <FadeIn y={40} className="mb-14 sm:mb-20">
          <ParallaxText baseY={60}>
            <h2 className="hero-heading font-serif font-medium uppercase tracking-[0.05em] leading-none text-center text-[3.5rem] sm:text-[8vw] md:text-[10vw] lg:text-[130px]">
              Showcase
            </h2>
          </ParallaxText>
        </FadeIn>

        {/* Filter Pills */}
        <FadeIn y={30} delay={0.1} className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16 sm:mb-24">
          {filters.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 sm:px-8 sm:py-2.5 rounded-full text-[10px] sm:text-xs uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? 'bg-[#F5F1E8] text-[#050505] border-[#F5F1E8] shadow-xl shadow-black/40 scale-105'
                    : 'bg-transparent text-[#B8B1A6] border-[#F5F1E8]/10 hover:text-[#F5F1E8] hover:border-[#F5F1E8]/20'
                }`}
              >
                {filter}
              </button>
            )
          })}
        </FadeIn>

        {/* Masonry Image Grid using Tailwind Columns */}
        <div className="w-full columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item: GalleryItem) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.94, y: 35 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
                key={item.id}
                className="break-inside-avoid relative group overflow-hidden rounded-2xl border border-[#F5F1E8]/5 shadow-2xl aspect-[4/5] sm:aspect-auto"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                />
                
                {/* Hover overlay with layout info */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-[#8B5CF6] mb-1.5">
                    {item.category}
                  </span>
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
