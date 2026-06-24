import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import ContactButton from '../components/ui/ContactButton'

interface HeroSectionProps {
  isReveal?: boolean
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isReveal = false }) => {
  const { tagline } = PORTFOLIO_DATA.personal

  const [typingStarted, setTypingStarted] = useState(false)
  const [typingComplete, setTypingComplete] = useState(false)
  const [typedText, setTypedText] = useState('')
  const fullText = "HI, I'M SANIDHYA"

  useEffect(() => {
    if (!isReveal) return

    // Start typewriter typing 1.8 seconds after reveal starts
    const timer = setTimeout(() => {
      setTypingStarted(true)
    }, 1800)

    return () => clearTimeout(timer)
  }, [isReveal])

  useEffect(() => {
    if (!typingStarted) return

    let currentIndex = 0
    const duration = 2200 // 2.2 seconds total typing duration
    const stepTime = Math.floor(duration / fullText.length) // ~146ms per character

    const interval = setInterval(() => {
      currentIndex++
      setTypedText(fullText.slice(0, currentIndex))
      
      if (currentIndex >= fullText.length) {
        clearInterval(interval)
        // Remove cursor shortly after typing finishes
        setTimeout(() => {
          setTypingComplete(true)
        }, 150)
      }
    }, stepTime)

    return () => clearInterval(interval)
  }, [typingStarted])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Scroll parallax for the large title
  const { scrollY } = useScroll()
  const titleY = useTransform(scrollY, [0, 800], [0, 140])

  // Explicit transitions for each element to coordinate premium entry
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] as const, delay: 1.0 }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' as const, delay: 1.6 }
    }
  }

  const bottomElementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }
    }
  }

  return (
    <motion.section
      id="hero"
      initial="hidden"
      animate={isReveal ? 'visible' : 'hidden'}
      className="relative h-screen flex flex-col justify-between bg-transparent z-10 px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 select-none"
    >
      {/* Background Cinematic Glow */}
      <div className="absolute inset-0 cinematic-glow pointer-events-none z-0" />

      {/* Navbar */}
      <motion.nav
        variants={navVariants}
        className="w-full relative z-30 flex justify-between items-center pt-6 md:pt-8 text-[#B8B1A6]"
      >
        <span
          className="font-serif tracking-[0.14em] text-lg sm:text-xl md:text-2xl font-medium text-[#F5F1E8] hover:tracking-[0.18em] hover:opacity-80 transition-all duration-500 ease-out cursor-pointer"
          onClick={() => scrollToSection('hero')}
        >
          BEYOND THE FRAME
        </span>
        <div className="flex gap-6 sm:gap-10 md:gap-14">
          {['About', 'Gallery', 'Stories', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="uppercase tracking-[0.2em] font-sans font-medium text-xs md:text-sm hover:text-[#F5F1E8] transition-colors duration-300 cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Hero Heading */}
      <motion.div variants={titleVariants} className="relative z-20 w-full mt-24 sm:mt-16 md:mt-12 overflow-hidden">
        <motion.div style={{ y: titleY, willChange: 'transform' }}>
          <h1
            className="
            luxury-sweep
            hero-heading
            font-serif
            font-medium
            uppercase
            tracking-[0.05em]
            leading-none
            text-center
            sm:text-left
            whitespace-nowrap
            w-full
            text-[8.5vw]
            sm:text-[9vw]
            md:text-[9.5vw]
            lg:text-[9.5vw]
            mt-6
            sm:mt-4
            md:-mt-5
            "
          >
            {!typingStarted ? '\u200B' : (
              <>
                {typedText}
                {!typingComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.4, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' }}
                    className="inline-block w-[3px] sm:w-[4px] md:w-[6px] lg:w-[8px] h-[0.75em] bg-[#8B5CF6] align-middle ml-2"
                  />
                )}
              </>
            )}
          </h1>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="relative z-25 flex justify-between items-end w-full">
        {/* Left tagline */}
        <motion.div
          variants={bottomElementVariants}
          initial="hidden"
          animate={typingComplete ? 'visible' : 'hidden'}
        >
          <p className="font-sans font-light tracking-[0.08em] leading-relaxed text-[#B8B1A6] uppercase max-w-[160px] sm:max-w-[220px] md:max-w-[280px]" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.85rem)' }}>
            {tagline}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={bottomElementVariants}
          initial="hidden"
          animate={typingComplete ? 'visible' : 'hidden'}
          className="absolute left-1/2 -translate-x-1/2 bottom-2 hidden md:flex flex-col items-center gap-2 text-[#B8B1A6]/40 text-[9px] tracking-[0.25em] uppercase"
        >
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-6 rounded-full bg-[#F5F1E8]/10 relative"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] absolute top-1 left-0" />
          </motion.div>
        </motion.div>

        {/* Right Button */}
        <motion.div
          variants={bottomElementVariants}
          initial="hidden"
          animate={typingComplete ? 'visible' : 'hidden'}
        >
          <ContactButton onClick={() => scrollToSection('contact')} />
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HeroSection
