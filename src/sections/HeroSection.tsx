import React from 'react'
import { motion } from 'framer-motion'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import Magnet from '../components/ui/Magnet'
import ContactButton from '../components/ui/ContactButton'
import FadeIn from '../components/ui/FadeIn'

export const HeroSection: React.FC = () => {
  const { name, title, tagline, portraitUrl } = PORTFOLIO_DATA.personal

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative h-screen flex flex-col justify-between overflow-hidden bg-[#0C0C0C] px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 select-none">
      {/* Navbar */}
      <FadeIn y={-20} delay={0} className="w-full">
        <nav className="flex justify-between items-center pt-6 md:pt-8 text-[#D7E2EA]">
          <span className="font-bold tracking-widest text-lg md:text-xl cursor-pointer" onClick={() => scrollToSection('hero')}>
            {name}.
          </span>
          <div className="flex gap-6 sm:gap-10 md:gap-14">
            {['About', 'Gallery', 'Stories', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="uppercase tracking-wider font-medium text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      </FadeIn>

      {/* Hero Portrait (Centered absolutely) */}
      <FadeIn 
        y={30} 
        delay={0.6} 
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
            className="w-full h-full object-cover rounded-[20px] sm:rounded-[30px] border border-white/10 shadow-2xl pointer-events-none"
          />
        </Magnet>
      </FadeIn>

      {/* Hero Heading */}
      <div className="relative z-20 w-full mt-24 sm:mt-16 md:mt-12 overflow-hidden">
        <FadeIn y={40} delay={0.15} duration={0.8}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none text-center sm:text-left whitespace-nowrap w-full text-[8.5vw] sm:text-[9vw] md:text-[9.5vw] lg:text-[9.5vw] mt-6 sm:mt-4 md:-mt-5">
            {title}
          </h1>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-25 flex justify-between items-end w-full">
        {/* Left tagline */}
        <FadeIn y={20} delay={0.35}>
          <p className="font-light uppercase tracking-wide leading-snug text-[#D7E2EA] max-w-[160px] sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
            {tagline}
          </p>
        </FadeIn>

        {/* Scroll Indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2 hidden md:flex flex-col items-center gap-2 text-white/40 text-[10px] tracking-widest uppercase">
          <span>Scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-6 rounded-full bg-white/20 relative"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 absolute top-1 left-0" />
          </motion.div>
        </div>

        {/* Right Button */}
        <FadeIn y={20} delay={0.5}>
          <ContactButton onClick={() => scrollToSection('contact')} />
        </FadeIn>
      </div>
    </section>
  )
}

export default HeroSection
