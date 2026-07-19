import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PORTFOLIO_DATA } from '../data/portfolioData'

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  // Use scoped scroll tracking to avoid global calculations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  // Row 1: moves RIGHT on scroll
  const row1X = useTransform(scrollYProgress, [0, 1], ["-400px", "100px"])

  // Row 2: moves LEFT on scroll
  const row2X = useTransform(scrollYProgress, [0, 1], ["400px", "-100px"])

  // Row 1: first 11 images, tripled
  const row1Gifs = [
    ...PORTFOLIO_DATA.marqueeGifs.slice(0, 11),
    ...PORTFOLIO_DATA.marqueeGifs.slice(0, 11),
    ...PORTFOLIO_DATA.marqueeGifs.slice(0, 11)
  ]

  // Row 2: remaining 10 images, tripled
  const row2Gifs = [
    ...PORTFOLIO_DATA.marqueeGifs.slice(11),
    ...PORTFOLIO_DATA.marqueeGifs.slice(11),
    ...PORTFOLIO_DATA.marqueeGifs.slice(11)
  ]

  return (
    <div
      ref={sectionRef}
      className="bg-transparent z-10 pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden relative select-none"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1 */}
        <div className="w-full overflow-hidden flex">
          <motion.div
            style={{ x: row1X, z: 0, willChange: 'transform' }}
            className="flex gap-3 whitespace-nowrap"
          >
            {row1Gifs.map((gifUrl, idx) => (
              <img
                key={`row1-${idx}`}
                src={gifUrl}
                alt="Marquee Item Row 1"
                loading="lazy"
                className="w-[280px] h-[180px] sm:w-[350px] sm:h-[225px] md:w-[420px] md:h-[270px] rounded-2xl object-cover flex-shrink-0"
              />
            ))}
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="w-full overflow-hidden flex">
          <motion.div
            style={{ x: row2X, z: 0, willChange: 'transform' }}
            className="flex gap-3 whitespace-nowrap"
          >
            {row2Gifs.map((gifUrl, idx) => (
              <img
                key={`row2-${idx}`}
                src={gifUrl}
                alt="Marquee Item Row 2"
                loading="lazy"
                className="w-[280px] h-[180px] sm:w-[350px] sm:h-[225px] md:w-[420px] md:h-[270px] rounded-2xl object-cover flex-shrink-0"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default MarqueeSection
