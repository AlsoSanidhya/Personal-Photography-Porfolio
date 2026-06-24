import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import type { StoryItem } from '../data/portfolioData'
import LiveProjectButton from '../components/ui/LiveProjectButton'
import FadeIn from '../components/ui/FadeIn'
import ParallaxText from '../components/ui/ParallaxText'

interface CardProps {
  story: StoryItem
  index: number
  progress: any
  range: [number, number]
  targetScale: number
}

// Coordinated cinematic entry variants for the inner story elements
const cardContentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

const leftItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] as const }
  }
}

const rightItemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] as const }
  }
}

const imageVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.1, ease: [0.25, 0.1, 0.25, 1] as const }
  }
}

const StoryCard: React.FC<CardProps> = ({ story, index, progress, range, targetScale }) => {
  const containerRef = useRef(null)
  
  // Custom transform tracking card scaling inside stack
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0 px-4">
      <motion.div
        variants={cardContentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        style={{
          scale,
          top: `calc(10vh + ${index * 28}px)`,
        }}
        className="story-card relative w-full max-w-5xl rounded-3xl border border-[#F5F1E8]/10 bg-[#0A0A0A] p-6 sm:p-8 md:p-12 shadow-2xl flex flex-col justify-between overflow-hidden"
      >
        {/* Top Row: Number, Category/Title, View Story Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <motion.div variants={leftItemVariants} className="flex items-center gap-4 sm:gap-6">
            <span className="font-serif font-light text-5xl sm:text-7xl md:text-8xl text-[#F5F1E8]/90 leading-none">
              {story.number}
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-[#8B5CF6] uppercase mb-1">
                {story.category}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-[#F5F1E8]">
                {story.title}
              </h3>
            </div>
          </motion.div>
          
          <motion.div variants={rightItemVariants}>
            <LiveProjectButton label="View Story" />
          </motion.div>
        </div>

        {/* Bottom Row: Image Grid (2-column layout) with a fixed height container */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 md:gap-6 h-[320px] sm:h-[420px] md:h-[480px] w-full">
          {/* Left Column (40% width / 4 cols) - 2 Stacked Images */}
          <div className="md:col-span-4 flex flex-col gap-4 h-full">
            <motion.div variants={imageVariants} className="h-[48%] overflow-hidden rounded-xl border border-[#F5F1E8]/5">
              <img
                src={story.images.col1Img1}
                alt={`${story.title} 1`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
              />
            </motion.div>
            <motion.div variants={imageVariants} className="h-[48%] overflow-hidden rounded-xl border border-[#F5F1E8]/5">
              <img
                src={story.images.col1Img2}
                alt={`${story.title} 2`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
              />
            </motion.div>
          </div>
          
          {/* Right Column (60% width / 6 cols) - 1 Tall Image */}
          <motion.div variants={imageVariants} className="md:col-span-6 h-full overflow-hidden rounded-xl border border-[#F5F1E8]/5">
            <img
              src={story.images.col2Img}
              alt={`${story.title} Tall`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export const StoriesSection: React.FC = () => {
  const containerRef = useRef(null)
  const { stories } = PORTFOLIO_DATA

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  return (
    <section
      id="stories"
      ref={containerRef}
      className="relative bg-transparent z-10 pb-32 md:pb-44 select-none border-t border-[#F5F1E8]/5"
    >
      {/* Background Cinematic Glow */}
      <div className="absolute inset-0 cinematic-glow pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto pt-32 pb-16 flex flex-col items-center relative z-10">
        {/* Section Title */}
        <FadeIn y={40} className="mb-6">
          <ParallaxText baseY={60}>
            <h2 className="hero-heading font-serif font-medium uppercase tracking-[0.05em] leading-none text-center text-[3.5rem] sm:text-[8vw] md:text-[10vw] lg:text-[130px]">
              Stories
            </h2>
          </ParallaxText>
        </FadeIn>
      </div>

      {/* Stacking list */}
      <div className="relative">
        {stories.map((story, idx) => {
          const total = stories.length
          const targetScale = 1 - (total - 1 - idx) * 0.03
          
          const start = idx / total
          const end = 1
          const range: [number, number] = [start, end]

          return (
            <StoryCard
              key={story.id}
              story={story}
              index={idx}
              progress={scrollYProgress}
              range={range}
              targetScale={targetScale}
            />
          )
        })}
      </div>
    </section>
  )
}

export default StoriesSection
