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
      className="relative min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-32 md:py-44 bg-[#050505] overflow-hidden select-none"
    >
      {/* Background Cinematic Glow */}
      <div className="absolute inset-0 cinematic-glow pointer-events-none z-0" />

      {/* Floating 3D Corner Icons with lowered opacity and screen blending for a softer gallery feel */}
      {/* Top Left - Moon */}
      <FadeIn
        x={-80}
        y={0}
        delay={0.1}
        duration={0.9}
        className="absolute top-[8%] left-[2%] sm:left-[4%] md:left-[6%] z-10 w-[100px] sm:w-[130px] md:w-[170px] pointer-events-none opacity-40 mix-blend-screen"
      >
        <img src={moon} alt="3D Moon Icon" className="w-full h-auto animate-float-slow" />
      </FadeIn>

      {/* Bottom Left - 3D Object */}
      <FadeIn
        x={-80}
        y={0}
        delay={0.25}
        duration={0.9}
        className="absolute bottom-[10%] left-[4%] sm:left-[8%] md:left-[12%] z-10 w-[80px] sm:w-[110px] md:w-[140px] pointer-events-none opacity-30 mix-blend-screen"
      >
        <img src={object3d} alt="3D Object" className="w-full h-auto animate-float-mid" />
      </FadeIn>

      {/* Top Right - Lego */}
      <FadeIn
        x={80}
        y={0}
        delay={0.15}
        duration={0.9}
        className="absolute top-[8%] right-[2%] sm:right-[4%] md:right-[6%] z-10 w-[100px] sm:w-[130px] md:w-[170px] pointer-events-none opacity-35 mix-blend-screen"
      >
        <img src={lego} alt="3D Lego Icon" className="w-full h-auto animate-float-mid" />
      </FadeIn>

      {/* Bottom Right - 3D Group */}
      <FadeIn
        x={80}
        y={0}
        delay={0.3}
        duration={0.9}
        className="absolute bottom-[10%] right-[4%] sm:right-[8%] md:right-[12%] z-10 w-[110px] sm:w-[145px] md:w-[180px] pointer-events-none opacity-40 mix-blend-screen"
      >
        <img src={group3d} alt="3D Group" className="w-full h-auto animate-float-slow" />
      </FadeIn>

      {/* Center Content Block */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl">
        {/* Heading */}
        <FadeIn y={40} delay={0} className="mb-14 sm:mb-20">
          <h2 className="hero-heading font-serif font-medium uppercase tracking-[0.05em] leading-none text-[3.5rem] sm:text-[8vw] md:text-[10vw] lg:text-[130px]">
            About me
          </h2>
        </FadeIn>

        {/* Scroll Character-Reveal text */}
        <div className="px-4 mb-20 sm:mb-28">
          <AnimatedText
            text={bio}
            className="text-[#F5F1E8] font-sans font-light tracking-[0.03em] leading-relaxed max-w-[620px] text-[1.05rem] sm:text-[1.2rem] md:text-[1.25rem]"
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
