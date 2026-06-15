import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import type { GalleryItem } from '../data/portfolioData'
import FadeIn from '../components/ui/FadeIn'

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Nature' | 'Street' | 'Travel' | 'Lifestyle'>('All')
  const { gallery } = PORTFOLIO_DATA

  const filteredItems = activeFilter === 'All'
    ? gallery
    : gallery.filter(item => item.category === activeFilter)

  const filters: ('All' | 'Nature' | 'Street' | 'Travel' | 'Lifestyle')[] = [
    'All', 'Nature', 'Street', 'Travel', 'Lifestyle'
  ]

  return (
    <section
      id="gallery"
      className="relative bg-[#0C0C0C] text-white px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-20 select-none border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <FadeIn y={40} className="mb-10 sm:mb-12">
          <h2 className="hero-heading font-black uppercase tracking-tight leading-none text-center text-[3.5rem] sm:text-[8vw] md:text-[10vw] lg:text-[160px]">
            Showcase
          </h2>
        </FadeIn>

        {/* Filter Pills */}
        <FadeIn y={30} delay={0.1} className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
          {filters.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 sm:px-7 sm:py-2.5 rounded-full text-xs sm:text-sm uppercase tracking-widest font-medium transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? 'bg-white text-black border-white shadow-lg shadow-white/5 scale-105'
                    : 'bg-transparent text-slate-400 border-white/10 hover:text-white hover:border-white/20'
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                key={item.id}
                className="break-inside-avoid relative group overflow-hidden rounded-3xl border border-white/5 shadow-2xl aspect-[4/5] sm:aspect-auto"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Hover overlay with layout info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <span className="text-xs font-semibold tracking-widest uppercase text-violet-400 mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold">
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
