import React from 'react'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import FadeIn from '../components/ui/FadeIn'
import AnimatedText from '../components/ui/AnimatedText'
import ContactButton from '../components/ui/ContactButton'

export const AboutSection: React.FC = () => {
  const { moon, object3d, lego, group3d } = PORTFOLIO_DATA.aboutAssets
  const { bio } = PORTFOLIO_DATA.personal

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden select-none"
    >
      {/* Floating 3D Corner Icons */}
      {/* Top Left - Moon */}
      <FadeIn
        x={-80}
        y={0}
        delay={0.1}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none"
      >
        <img src={moon} alt="3D Moon Icon" className="w-full h-auto animate-float-slow" />
      </FadeIn>

      {/* Bottom Left - 3D Object */}
      <FadeIn
        x={-80}
        y={0}
        delay={0.25}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 w-[100px] sm:w-[140px] md:w-[180px] pointer-events-none"
      >
        <img src={object3d} alt="3D Object" className="w-full h-auto animate-float-mid" />
      </FadeIn>

      {/* Top Right - Lego */}
      <FadeIn
        x={80}
        y={0}
        delay={0.15}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 w-[120px] sm:w-[160px] md:w-[210px] pointer-events-none"
      >
        <img src={lego} alt="3D Lego Icon" className="w-full h-auto animate-float-mid" />
      </FadeIn>

      {/* Bottom Right - 3D Group */}
      <FadeIn
        x={80}
        y={0}
        delay={0.3}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 w-[130px] sm:w-[170px] md:w-[220px] pointer-events-none"
      >
        <img src={group3d} alt="3D Group" className="w-full h-auto animate-float-slow" />
      </FadeIn>

      {/* Center Content Block */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl">
        {/* Heading */}
        <FadeIn y={40} delay={0} className="mb-10 sm:mb-14 md:mb-16">
          <h2 className="hero-heading font-black uppercase tracking-tight leading-none text-[3.5rem] sm:text-[8vw] md:text-[10vw] lg:text-[160px]">
            About me
          </h2>
        </FadeIn>

        {/* Scroll Character-Reveal text */}
        <div className="px-4 mb-16 sm:mb-20 md:mb-24">
          <AnimatedText
            text={bio}
            className="text-[#D7E2EA] font-medium leading-relaxed max-w-[560px] text-[1.1rem] sm:text-[1.25rem] md:text-[1.35rem]"
          />
        </div>

        {/* Contact CTA */}
        <FadeIn y={30} delay={0.4}>
          <ContactButton onClick={scrollToContact} />
        </FadeIn>
      </div>
    </section>
  )
}

export default AboutSection
