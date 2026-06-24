import React from 'react'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import FadeIn from '../components/ui/FadeIn'
import AnimatedText from '../components/ui/AnimatedText'
import ContactButton from '../components/ui/ContactButton'
import ParallaxText from '../components/ui/ParallaxText'
import ThreeDObject from '../components/ui/ThreeDSideObjects'

export const AboutSection: React.FC = () => {
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
      className="relative min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-32 md:py-44 bg-transparent z-10 select-none overflow-hidden"
    >
      {/* Background Cinematic Glow */}
      <div className="absolute inset-0 cinematic-glow pointer-events-none z-0" />

      {/* Floating 3D Corner Canvas Objects - Top Left: Moon */}
      <FadeIn
        x={-80}
        y={0}
        delay={0.1}
        duration={0.9}
        className="absolute top-[8%] left-[2%] sm:left-[4%] md:left-[6%] z-10 w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] md:w-[210px] md:h-[210px] lg:w-[260px] lg:h-[260px] pointer-events-none opacity-80"
      >
        <ThreeDObject type="moon" />
      </FadeIn>

      {/* Floating 3D Corner Canvas Objects - Bottom Left: Torus Knot */}
      <FadeIn
        x={-80}
        y={0}
        delay={0.2}
        duration={0.9}
        className="absolute bottom-[10%] left-[4%] sm:left-[6%] md:left-[8%] z-10 w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[180px] md:h-[180px] lg:w-[230px] lg:h-[230px] pointer-events-none opacity-70"
      >
        <ThreeDObject type="object3d" />
      </FadeIn>

      {/* Floating 3D Corner Canvas Objects - Top Right: Lego */}
      <FadeIn
        x={80}
        y={0}
        delay={0.15}
        duration={0.9}
        className="absolute top-[8%] right-[2%] sm:right-[4%] md:right-[6%] z-10 w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] md:w-[210px] md:h-[210px] lg:w-[260px] lg:h-[260px] pointer-events-none opacity-80"
      >
        <ThreeDObject type="lego" />
      </FadeIn>

      {/* Floating 3D Corner Canvas Objects - Bottom Right: Cluster Group */}
      <FadeIn
        x={80}
        y={0}
        delay={0.25}
        duration={0.9}
        className="absolute bottom-[10%] right-[4%] sm:right-[6%] md:right-[8%] z-10 w-[110px] h-[110px] sm:w-[145px] sm:h-[145px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] pointer-events-none opacity-80"
      >
        <ThreeDObject type="group3d" />
      </FadeIn>

      {/* Center Content Block */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl">
        {/* Heading */}
        <FadeIn y={40} delay={0} className="mb-14 sm:mb-20">
          <ParallaxText baseY={50}>
            <h2 className="hero-heading font-serif font-medium uppercase tracking-[0.05em] leading-none text-[3.5rem] sm:text-[8vw] md:text-[10vw] lg:text-[130px]">
              About me
            </h2>
          </ParallaxText>
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
