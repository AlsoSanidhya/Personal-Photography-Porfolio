import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import type { GalleryItem } from '../data/portfolioData'
import FadeIn from '../components/ui/FadeIn'
import ParallaxText from '../components/ui/ParallaxText'
import GalleryLightbox from '../components/ui/GalleryLightbox'
import { ArrowLeft, Images } from 'lucide-react'

export const GallerySection: React.FC = () => {
  const { albums } = PORTFOLIO_DATA
  const [selectedAlbumId, setSelectedAlbumId] = React.useState<string | null>(null)
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null)
  
  const currentAlbum = albums.find(a => a.id === selectedAlbumId)
  const displayImages = currentAlbum ? currentAlbum.images : []

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

        {/* Back Button & Title when Album is selected */}
        <AnimatePresence mode="wait">
          {currentAlbum && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex items-center justify-between mb-8"
            >
              <button
                onClick={() => setSelectedAlbumId(null)}
                className="group flex items-center gap-2 text-[#B8B1A6] hover:text-[#F5F1E8] transition-colors duration-300"
              >
                <div className="p-2 bg-[#F5F1E8]/5 rounded-full border border-[#F5F1E8]/10 group-hover:bg-[#F5F1E8]/10 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <span className="font-sans text-xs uppercase tracking-[0.2em]">Back to Albums</span>
              </button>
              <h3 className="font-serif text-2xl text-[#F5F1E8]">{currentAlbum.year} Collection</h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Switch: Albums vs Masonry */}
        <AnimatePresence mode="wait">
          {!currentAlbum ? (
            /* Album Grid View */
            <motion.div
              key="albums"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {albums.map((album, idx) => (
                <motion.div
                  key={album.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '50px' }}
                  whileHover={{ y: -6, borderColor: 'rgba(139, 92, 246, 0.3)', boxShadow: '0 20px 40px rgba(139, 92, 246, 0.08)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  onClick={() => setSelectedAlbumId(album.id)}
                  className="group cursor-pointer relative bg-[#0A0A0A] border border-[#F5F1E8]/5 rounded-2xl overflow-hidden aspect-[4/3] w-full"
                >
                  <img
                    src={album.coverImage}
                    alt={`${album.year} Album`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-[#8B5CF6] uppercase block mb-1">
                        Archive
                      </span>
                      <h3 className="font-serif text-3xl font-normal text-[#F5F1E8]">
                        {album.year}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 bg-[#F5F1E8]/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#F5F1E8]/10">
                      <Images className="w-3.5 h-3.5 text-[#B8B1A6]" />
                      <span className="text-xs font-sans text-[#B8B1A6] tracking-widest">{album.images.length}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Masonry Image Grid using Tailwind Columns */
            <motion.div 
              key="masonry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              <AnimatePresence mode="popLayout">
                {displayImages.map((item: GalleryItem, index: number) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94, y: 35 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '50px' }}
                    whileTap={{ scale: 0.98 }}
                    style={{ willChange: "opacity, transform" }}
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={displayImages.length > 0 ? displayImages : currentAlbum?.images || []}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}

export default GallerySection
