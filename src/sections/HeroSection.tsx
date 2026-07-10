import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ContactButton from '../components/ui/ContactButton'

interface HeroSectionProps {
  isReveal?: boolean
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isReveal = false }) => {
  const [typingComplete, setTypingComplete] = useState(false)
  
  const linesOfWords = [
    [
      { text: "EVERY", style: "ivory" },
      { text: "FRAME", style: "gradient" }
    ],
    [
      { text: "TELLS A", style: "ivory" },
      { text: "STORY.", style: "gradient-glow" }
    ]
  ]

  useEffect(() => {
    if (!isReveal) return

    // Trigger typing complete after 4.1 seconds (1.6s delay before children start + 2.5s reveal duration)
    const completeTimer = setTimeout(() => {
      setTypingComplete(true)
    }, 4100)

    return () => clearTimeout(completeTimer)
  }, [isReveal])

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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25, // 4 items * 0.25s = 0.75s stagger delay
        delayChildren: 1.6, // Starts after Hello overlay exits
      }
    }
  }

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: 'blur(5px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { 
        duration: 1.1, 
        ease: [0.25, 1, 0.5, 1] as const
      }
    }
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.6 }
    }
  }

  const scrollVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 0.4,
      y: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const, delay: 0.9 }
    }
  }

  return (
    <motion.section
      id="hero"
      initial="hidden"
      animate={isReveal ? 'visible' : 'hidden'}
      className="relative h-screen flex flex-col justify-between bg-transparent z-10 px-6 pb-7 sm:pb-8 md:pb-10 select-none"
    >
      {/* Background Cinematic Glow */}
      <div className="absolute inset-0 cinematic-glow pointer-events-none z-0" />

      {/* Navbar */}
      <motion.nav
        variants={navVariants}
        className="w-full relative z-30 flex justify-between items-center pt-6 text-[#B8B1A6]"
      >
        <span
          className="font-serif tracking-[0.14em] text-sm sm:text-base md:text-lg font-medium text-[#F5F1E8] hover:tracking-[0.18em] hover:opacity-80 transition-all duration-500 ease-out cursor-pointer"
          onClick={() => scrollToSection('hero')}
        >
          BEYOND THE FRAME
        </span>
        <div className="flex gap-6 sm:gap-10 md:gap-14">
          {['About', 'Gallery', 'Contact'].map((item) => (
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
      <motion.div 
        variants={containerVariants}
        className="relative z-20 w-full flex-grow flex items-center justify-center overflow-hidden my-4"
      >
        <motion.div style={{ y: titleY, willChange: 'transform' }} className="w-full">
          <h1
            className="
            hero-heading
            font-serif
            font-medium
            text-center
            mx-auto
            w-full
            tracking-[-0.04em]
            text-[clamp(3rem,8vw,5rem)]
            md:text-[clamp(7rem,10vw,10rem)]
            "
            style={{ 
              lineHeight: '0.85',
              fontFamily: "'Canela', 'PP Editorial New', 'Saol Display', 'IvyPresto', 'Cormorant Garamond', serif"
            }}
          >
            {linesOfWords.map((line, lineIndex) => (
              <span key={lineIndex} className="block overflow-hidden py-2 sm:py-3">
                {line.map((word, wordIndex) => (
                  <React.Fragment key={wordIndex}>
                    {wordIndex > 0 && "\u00A0"}
                    
                    {word.style === "gradient" || word.style === "gradient-glow" ? (
                      <span style={{ filter: 'drop-shadow(0 0 18px rgba(184,145,255,0.15))' }} className="inline-block">
                        <motion.span 
                          variants={wordVariants} 
                          className="animate-text-gradient inline-block"
                        >
                          {word.text}
                        </motion.span>
                      </span>
                    ) : (
                      <motion.span 
                        variants={wordVariants} 
                        className="inline-block text-[#F8F5EF]"
                      >
                        {word.text}
                      </motion.span>
                    )}
                  </React.Fragment>
                ))}
              </span>
            ))}
          </h1>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="relative z-25 flex justify-between items-end w-full">
        {/* Left tagline */}
        <motion.div
          variants={subtitleVariants}
          initial="hidden"
          animate={typingComplete ? 'visible' : 'hidden'}
        >
          <p className="font-sans font-light tracking-[0.08em] leading-relaxed text-[#B8B1A6] uppercase max-w-[280px]" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.85rem)' }}>
            Photography &bull; Design &bull; Creative Technology
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={scrollVariants}
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
          variants={buttonVariants}
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
