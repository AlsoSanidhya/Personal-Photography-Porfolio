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

  // Dynamically find the WebP version of the hero portrait image (DSC_1305.webp)
  const portraitItem = PORTFOLIO_DATA.gallery.find(item => item.imageUrl.includes('DSC_1305'))
  const portraitUrl = portraitItem ? portraitItem.imageUrl : PORTFOLIO_DATA.gallery[0]?.imageUrl

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Small custom Sparkle SVG divider component
  const SparkleIcon = () => (
    <svg 
      width="10" 
      height="10" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="text-[#8B5CF6] opacity-30 w-2.5 h-2.5 my-4"
    >
      <path d="M12 0c0 6.627-5.373 12-12 12 6.627 0 12 5.373 12 12 0-6.627 5.373-12 12-12-6.627 0-12-5.373-12-12z" />
    </svg>
  )

  return (
    <section
      id="about"
      className="relative min-h-[100dvh] flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 pt-24 pb-32 md:py-44 bg-transparent z-10 select-none overflow-hidden"
    >
      {/* Background Cinematic Glow - Desktop Only */}
      <div className="absolute inset-0 hidden md:block cinematic-glow pointer-events-none z-0" />

      {/* Mobile-Only Premium Vignette/Noise Background */}
      <div className="absolute inset-0 block md:hidden pointer-events-none z-0 overflow-hidden">
        {/* Faint radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06)_0%,transparent_70%)]" />
        {/* Subtle noise */}
        <div className="absolute inset-0 bg-noise opacity-[0.015]" />
        {/* Slight vignette */}
        <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)' }} />
      </div>

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

        {/* Portrait Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex justify-center items-center mb-10"
        >
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-[120px] h-[120px] rounded-full overflow-hidden border border-white/20 shadow-lg relative flex items-center justify-center"
            style={{
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.15)',
            }}
          >
            <img
              src={portraitUrl}
              alt="Sanidhya Negi"
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          </motion.div>
        </motion.div>

        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full bg-[#121212]/85 border border-white/5 backdrop-blur-[4px] rounded-[18px] p-5 shadow-md"
        >
          <p 
            className="font-sans font-light text-[18px] sm:text-[19px] leading-[1.9] text-[#E5E0D8] mx-auto"
            style={{ maxWidth: '26ch', letterSpacing: '0.2px' }}
          >
            I'm Sanidhya, an undergrad who enjoys exploring different creative fields. Photography is one of my favorite hobbies, but it isn't the only thing that defines me. I'm passionate about technology, editing, design, content creation, and constantly learning new skills.
          </p>
        </motion.div>

        {/* Sparkle Divider */}
        <SparkleIcon />

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full bg-[#121212]/85 border border-white/5 backdrop-blur-[4px] rounded-[18px] p-5 shadow-md"
        >
          <p 
            className="font-sans font-light text-[18px] sm:text-[19px] leading-[1.9] text-[#E5E0D8] mx-auto"
            style={{ maxWidth: '26ch', letterSpacing: '0.2px' }}
          >
            I enjoy experimenting with new ideas, building projects, and exploring different creative outlets. Rather than trying to be an expert in just one thing, I believe in continuous learning, creating, and growing through every experience.
          </p>
        </motion.div>

        {/* Sparkle Divider */}
        <SparkleIcon />

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full bg-[#121212]/85 border border-white/5 backdrop-blur-[4px] rounded-[18px] p-5 shadow-md"
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
          className="w-full flex justify-center mt-10"
        >
          <ContactButton onClick={scrollToContact} />
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
