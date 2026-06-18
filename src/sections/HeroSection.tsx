import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import Magnet from '../components/ui/Magnet'
import ContactButton from '../components/ui/ContactButton'

export const HeroSection: React.FC = () => {
  const { name, title, tagline, portraitUrl } = PORTFOLIO_DATA.personal

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Scroll parallax for the large title
  const { scrollY } = useScroll()
  const titleY = useTransform(scrollY, [0, 800], [0, 140])

  // Coordinated mount staggers for a premium cinematic entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 45 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  }

  const portraitVariants = {
    hidden: { opacity: 0, y: 55, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.6, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  }

  const bottomElementVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  }

  return (
    <motion.section
      id="hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative h-screen flex flex-col justify-between overflow-hidden bg-[#050505] px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 select-none"
    >
      {/* Background Cinematic Glow */}
      <div className="absolute inset-0 cinematic-glow pointer-events-none z-0" />

      {/* Navbar */}
      <motion.nav
        variants={navVariants}
        className="w-full relative z-30 flex justify-between items-center pt-6 md:pt-8 text-[#B8B1A6]"
      >
        <span
          className="font-serif tracking-widest text-xl md:text-2xl font-medium text-[#F5F1E8] cursor-pointer"
          onClick={() => scrollToSection('hero')}
        >
          {name}.
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

      {/* Hero Portrait (Centered absolutely) */}
      <motion.div
        variants={portraitVariants}
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          className="relative w-full aspect-[4/5]"
        >
          <img
            src={portraitUrl}
            alt={`${name} Portrait`}
            className="w-full h-full object-cover rounded-[16px] sm:rounded-[24px] border border-[#F5F1E8]/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] pointer-events-none"
          />
        </Magnet>
      </motion.div>

      {/* Hero Heading */}
      <motion.div variants={titleVariants} className="relative z-20 w-full mt-24 sm:mt-16 md:mt-12 overflow-hidden">
        <motion.div style={{ y: titleY, willChange: 'transform' }}>
          <motion.h1
            className="hero-heading font-serif font-medium uppercase tracking-[0.05em] leading-none text-center sm:text-left whitespace-nowrap w-full text-[8.5vw] sm:text-[9vw] md:text-[9.5vw] lg:text-[9.5vw] mt-6 sm:mt-4 md:-mt-5"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 2,
              delay: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {title}
          </motion.h1>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="relative z-25 flex justify-between items-end w-full">
        {/* Left tagline */}
        <motion.div variants={bottomElementVariants}>
          <p className="font-sans font-light tracking-[0.08em] leading-relaxed text-[#B8B1A6] uppercase max-w-[160px] sm:max-w-[220px] md:max-w-[280px]" style={{ fontSize: 'clamp(0.65rem, 1vw, 0.85rem)' }}>
            {tagline}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={bottomElementVariants}
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
        <motion.div variants={bottomElementVariants}>
          <ContactButton onClick={() => scrollToSection('contact')} />
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HeroSection
