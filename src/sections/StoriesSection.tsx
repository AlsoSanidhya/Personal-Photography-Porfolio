import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import type { StoryItem } from '../data/portfolioData'
import LiveProjectButton from '../components/ui/LiveProjectButton'
import FadeIn from '../components/ui/FadeIn'

interface CardProps {
  story: StoryItem
  index: number
  progress: any
  range: [number, number]
  targetScale: number
}

const StoryCard: React.FC<CardProps> = ({ story, index, progress, range, targetScale }) => {
  const containerRef = useRef(null)
  
  // Custom transform tracking card scaling inside stack
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0 px-4">
      <motion.div
        style={{
          scale,
          top: `calc(10vh + ${index * 28}px)`,
        }}
        className="relative w-full max-w-5xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 md:p-12 shadow-2xl flex flex-col justify-between overflow-hidden"
      >
        {/* Top Row: Number, Category/Title, View Story Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black text-4xl sm:text-6xl md:text-8xl text-white leading-none">
              {story.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">
                {story.category}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                {story.title}
              </h3>
            </div>
          </div>
          
          <LiveProjectButton label="View Story" />
        </div>

        {/* Bottom Row: Image Grid (2-column layout) with a fixed height container */}
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 md:gap-6 h-[320px] sm:h-[420px] md:h-[480px] w-full">
          {/* Left Column (40% width / 4 cols) - 2 Stacked Images */}
          <div className="md:col-span-4 flex flex-col gap-4 h-full">
            <div className="h-[48%] overflow-hidden rounded-[24px] sm:rounded-[36px] md:rounded-[40px] border border-white/5">
              <img
                src={story.images.col1Img1}
                alt={`${story.title} 1`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="h-[48%] overflow-hidden rounded-[24px] sm:rounded-[36px] md:rounded-[40px] border border-white/5">
              <img
                src={story.images.col1Img2}
                alt={`${story.title} 2`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
          
          {/* Right Column (60% width / 6 cols) - 1 Tall Image */}
          <div className="md:col-span-6 h-full overflow-hidden rounded-[24px] sm:rounded-[36px] md:rounded-[40px] border border-white/5">
            <img
              src={story.images.col2Img}
              alt={`${story.title} Tall`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
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
      className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 pb-20 select-none"
    >
      <div className="max-w-5xl mx-auto pt-24 pb-12 flex flex-col items-center">
        {/* Section Title */}
        <FadeIn y={40} className="mb-6">
          <h2 className="hero-heading font-black uppercase tracking-tight leading-none text-center text-[3.5rem] sm:text-[8vw] md:text-[10vw] lg:text-[160px]">
            Stories
          </h2>
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
