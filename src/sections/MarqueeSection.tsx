import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PORTFOLIO_DATA } from '../data/portfolioData'

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [sectionTop, setSectionTop] = useState(0)

  useEffect(() => {
    const updateSectionTop = () => {
      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop)
      }
    }
    updateSectionTop()
    window.addEventListener('resize', updateSectionTop)
    return () => window.removeEventListener('resize', updateSectionTop)
  }, [])

  const { scrollY } = useScroll()

  // Row 1: moves RIGHT on scroll (offset - 200)
  const row1X = useTransform(scrollY, (y) => {
    const offset = (y - sectionTop + window.innerHeight) * 0.3
    return `${offset - 400}px`
  })

  // Row 2: moves LEFT on scroll (-(offset - 200))
  const row2X = useTransform(scrollY, (y) => {
    const offset = (y - sectionTop + window.innerHeight) * 0.3
    return `${-(offset - 400)}px`
  })

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
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden relative select-none"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1 */}
        <div className="w-full overflow-hidden flex">
          <motion.div
            style={{ x: row1X, willChange: 'transform' }}
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
            style={{ x: row2X, willChange: 'transform' }}
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
