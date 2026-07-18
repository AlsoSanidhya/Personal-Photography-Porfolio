import React from 'react'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import FadeIn from '../components/ui/FadeIn'
import AnimatedText from '../components/ui/AnimatedText'
import ContactButton from '../components/ui/ContactButton'
import ParallaxText from '../components/ui/ParallaxText'
import ThreeDObject from '../components/ui/ThreeDSideObjects'
import { motion } from 'framer-motion'

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
      className="relative min-h-[100dvh] flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-24 md:py-44 bg-transparent z-10 select-none overflow-hidden"
    >
      {/* Background Cinematic Glow */}
      <div className="absolute inset-0 cinematic-glow pointer-events-none z-0" />

      {/* Floating 3D Corner Canvas Objects - Top Left: Moon */}
      <FadeIn
        x={-80}
        y={0}
        delay={0.1}
        duration={0.9}
        className="hidden lg:block absolute top-[8%] left-[2%] sm:left-[4%] md:left-[6%] z-10 w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] md:w-[210px] md:h-[210px] lg:w-[260px] lg:h-[260px] pointer-events-none opacity-80"
      >
        <ThreeDObject type="moon" />
      </FadeIn>

      {/* Floating 3D Corner Canvas Objects - Bottom Left: Torus Knot */}
      <FadeIn
        x={-80}
        y={0}
        delay={0.2}
        duration={0.9}
        className="hidden lg:block absolute bottom-[10%] left-[4%] sm:left-[6%] md:left-[8%] z-10 w-[100px] h-[100px] sm:w-[130px] sm:h-[130px] md:w-[180px] md:h-[180px] lg:w-[230px] lg:h-[230px] pointer-events-none opacity-70"
      >
        <ThreeDObject type="object3d" />
      </FadeIn>

      {/* Floating 3D Corner Canvas Objects - Top Right: Lego */}
      <FadeIn
        x={80}
        y={0}
        delay={0.15}
        duration={0.9}
        className="hidden lg:block absolute top-[8%] right-[2%] sm:right-[4%] md:right-[6%] z-10 w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] md:w-[210px] md:h-[210px] lg:w-[260px] lg:h-[260px] pointer-events-none opacity-80"
      >
        <ThreeDObject type="lego" />
      </FadeIn>

      {/* Floating 3D Corner Canvas Objects - Bottom Right: Cluster Group */}
      <FadeIn
        x={80}
        y={0}
        delay={0.25}
        duration={0.9}
        className="hidden lg:block absolute bottom-[10%] right-[4%] sm:right-[6%] md:right-[8%] z-10 w-[110px] h-[110px] sm:w-[145px] sm:h-[145px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] pointer-events-none opacity-80"
      >
        <ThreeDObject type="group3d" />
      </FadeIn>

      {/* --- DESKTOP LAYOUT (768px and above) --- */}
      <div className="hidden md:flex flex-col items-center text-center max-w-4xl relative z-20">
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

        {/* Mobile Image Grid (Hidden on Desktop) */}
        <div className="grid lg:hidden grid-cols-2 gap-x-2 gap-y-12 sm:gap-x-8 w-full max-w-[360px] sm:max-w-[480px] mx-auto mb-20 px-2">
          <div className="w-full aspect-[4/5]"><ThreeDObject type="moon" /></div>
          <div className="w-full aspect-[4/5] mt-10"><ThreeDObject type="lego" /></div>
          <div className="w-full aspect-[4/5]"><ThreeDObject type="object3d" /></div>
          <div className="w-full aspect-[4/5] mt-10"><ThreeDObject type="group3d" /></div>
        </div>

        {/* Contact CTA */}
        <FadeIn y={30} delay={0.4}>
          <ContactButton onClick={scrollToContact} />
        </FadeIn>
      </div>

      {/* --- MOBILE LAYOUT (max-width: 768px) --- */}
      <div className="flex md:hidden flex-col items-center w-full max-w-[320px] xs:max-w-[350px] sm:max-w-[440px] relative z-20">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-serif font-light text-center uppercase tracking-[0.08em] text-[48px] sm:text-[56px] text-[#F5F1E8] mb-8"
          style={{ textShadow: '0 0 15px rgba(245, 241, 232, 0.15)' }}
        >
          ABOUT ME
        </motion.h2>

        {/* Intro Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="w-[90%] mx-auto bg-white/5 border border-white/10 rounded-[18px] backdrop-blur-[6px] p-5 mb-8 text-center"
          style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.08)' }}
        >
          <p className="font-serif italic font-light text-[17px] leading-relaxed text-[#F5F1E8] tracking-wide">
            Every frame has a story.<br />Welcome to mine.
          </p>
        </motion.div>

        {/* Divider ✦ */}
        <div className="text-[#8B5CF6]/50 text-xs mb-8 tracking-widest pointer-events-none select-none filter drop-shadow-[0_0_4px_rgba(139,92,246,0.3)]">✦</div>

        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full bg-[#050505]/40 border border-white/5 backdrop-blur-md rounded-2xl p-[22px] mb-[18px]"
        >
          <p 
            className="font-sans font-light text-[18px] sm:text-[19px] leading-[1.9] text-[#E5E0D8] mx-auto"
            style={{ maxWidth: '26ch', letterSpacing: '0.2px' }}
          >
            I'm Sanidhya, an undergrad who enjoys exploring different creative fields. Photography is one of my favorite hobbies, but it isn't the only thing that defines me. I'm passionate about technology, editing, design, content creation, and constantly learning new skills.
          </p>
        </motion.div>

        {/* Divider • */}
        <div className="text-[#8B5CF6]/40 text-[9px] mb-[18px] pointer-events-none select-none filter drop-shadow-[0_0_3px_rgba(139,92,246,0.2)]">•</div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full bg-[#050505]/40 border border-white/5 backdrop-blur-md rounded-2xl p-[22px] mb-[18px]"
        >
          <p 
            className="font-sans font-light text-[18px] sm:text-[19px] leading-[1.9] text-[#E5E0D8] mx-auto"
            style={{ maxWidth: '26ch', letterSpacing: '0.2px' }}
          >
            I enjoy experimenting with new ideas, building projects, and exploring different creative outlets. Rather than trying to be an expert in just one thing, I believe in continuous learning, creating, and growing through every experience.
          </p>
        </motion.div>

        {/* Divider • */}
        <div className="text-[#8B5CF6]/40 text-[9px] mb-[18px] pointer-events-none select-none filter drop-shadow-[0_0_3px_rgba(139,92,246,0.2)]">•</div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full bg-[#050505]/40 border border-white/5 backdrop-blur-md rounded-2xl p-[22px] mb-12"
        >
          <p 
            className="font-sans font-light text-[18px] sm:text-[19px] leading-[1.9] text-[#E5E0D8] mx-auto"
            style={{ maxWidth: '26ch', letterSpacing: '0.2px' }}
          >
            This portfolio is a collection of the moments I capture, the projects I build, and the creativity I bring to everything I do.
          </p>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full flex justify-center"
        >
          <ContactButton onClick={scrollToContact} />
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
