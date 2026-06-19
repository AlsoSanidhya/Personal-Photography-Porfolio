import React from 'react'
import { motion } from 'framer-motion'
import { Music, Sparkles, ArrowUpRight } from 'lucide-react'
import { Instagram, Github, Linkedin } from '../components/ui/Icons'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import FadeIn from '../components/ui/FadeIn'
import ParallaxText from '../components/ui/ParallaxText'

// TODO: Replace with actual local Instagram preview image when available
import instagramPreview from '../assets/images/instagram-preview.jpg'

export const MyWorldSection: React.FC = () => {
  const socials = PORTFOLIO_DATA.socials

  const getSocial = (name: string) => socials.find(s => s.name.toLowerCase().includes(name.toLowerCase())) || { name, url: '#', handle: '' }

  const insta = getSocial('instagram')
  const spotify = getSocial('spotify')
  const github = getSocial('github')
  const linkedin = getSocial('linkedin')
  const projects = getSocial('projects')

  // Coordinated viewport stagger reveals
  const gridVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  }

  return (
    <section id="my-world" className="relative bg-transparent text-[#F5F1E8] px-5 sm:px-8 md:px-10 py-32 md:py-44 z-10 select-none border-t border-[#F5F1E8]/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <FadeIn y={40} className="mb-16 text-center sm:text-left">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#8B5CF6] uppercase mb-2 block">
            Digital Identity
          </span>
          <ParallaxText baseY={50} className="w-full flex justify-center sm:justify-start items-center">
            <h2 className="hero-heading font-serif font-medium uppercase tracking-[0.05em] leading-none text-[3.5rem] sm:text-[6vw] md:text-[80px]">
              My World
            </h2>
          </ParallaxText>
        </FadeIn>

        {/* Bento Grid Layout with Coordinated Viewport Stagger */}
        <motion.div 
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: Instagram (Large Square) */}
          <motion.div variants={cardVariants} className="md:col-span-2 md:row-span-2">
            <motion.a 
              href={insta.url} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.01, borderColor: 'rgba(139, 92, 246, 0.3)', boxShadow: '0 20px 40px rgba(139, 92, 246, 0.08)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative block h-[320px] sm:h-[400px] md:h-[450px] rounded-2xl bg-[#0A0A0A] border border-[#F5F1E8]/5 overflow-hidden transition-all duration-300 w-full"
            >
              <div className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-35 transition-opacity duration-500" style={{ backgroundImage: `url('${instagramPreview}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
              
              <div className="absolute top-6 left-6 p-3 bg-[#F5F1E8]/5 rounded-xl border border-[#F5F1E8]/10 text-[#8B5CF6] transition-colors duration-300 group-hover:bg-[#8B5CF6]/10">
                <Instagram className="w-5 h-5 animate-pulse" />
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-[#F5F1E8]/30 animate-bounce" />
              </div>

              <div className="absolute bottom-8 left-8">
                <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-[#8B5CF6] uppercase">Lifestyle & Captures</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F5F1E8] mt-1 mb-2">Instagram Feed</h3>
                <p className="text-xs text-[#B8B1A6] max-w-sm">{insta.handle} — Snapshotting street chronicles, aesthetics, and travel glimpses.</p>
              </div>
            </motion.a>
          </motion.div>

          {/* Card 2: Spotify */}
          <motion.div variants={cardVariants}>
            <motion.a 
              href={spotify.url} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.3)', boxShadow: '0 20px 40px rgba(139, 92, 246, 0.08)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative block h-[200px] sm:h-[210px] md:h-[210px] rounded-2xl bg-[#0A0A0A] border border-[#F5F1E8]/5 p-6 transition-all duration-300 overflow-hidden w-full"
            >
              <div className="absolute top-6 left-6 p-3 bg-[#F5F1E8]/5 rounded-xl border border-[#F5F1E8]/10 text-[#8B5CF6] transition-colors duration-300 group-hover:bg-[#8B5CF6]/10">
                <Music className="w-5 h-5" />
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-[#F5F1E8]/30" />
              </div>
              
              <div className="absolute bottom-6 left-6">
                <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-[#8B5CF6] uppercase">Soundtrack</span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#F5F1E8] mt-1 mb-1">Spotify Playlist</h3>
                <p className="text-xs text-[#B8B1A6]">{spotify.handle} — Curated tunes for editing, running, and creating.</p>
              </div>
            </motion.a>
          </motion.div>

          {/* Card 3: Creative Projects */}
          <motion.div variants={cardVariants} className="md:col-span-1">
            <motion.a 
              href={projects.url} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.3)', boxShadow: '0 20px 40px rgba(139, 92, 246, 0.08)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative block h-[200px] sm:h-[210px] md:h-[216px] rounded-2xl bg-[#0A0A0A] border border-[#F5F1E8]/5 p-6 transition-all duration-300 overflow-hidden w-full"
            >
              <div className="absolute top-6 left-6 p-3 bg-[#F5F1E8]/5 rounded-xl border border-[#F5F1E8]/10 text-[#8B5CF6] transition-colors duration-300 group-hover:bg-[#8B5CF6]/10">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-[#F5F1E8]/30" />
              </div>

              <div className="absolute bottom-6 left-6">
                <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-[#8B5CF6] uppercase">EXPERIMENTS</span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#F5F1E8] mt-1 mb-1">Creative Projects</h3>
                <p className="text-xs text-[#B8B1A6]">{projects.handle} — Personal experiments in photo editing, Lightroom workflows, design concepts, web projects, and creative ideas.</p>
              </div>
            </motion.a>
          </motion.div>

          {/* Card 4: GitHub */}
          <motion.div variants={cardVariants}>
            <motion.a 
              href={github.url} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.3)', boxShadow: '0 20px 40px rgba(139, 92, 246, 0.08)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative block h-[200px] rounded-2xl bg-[#0A0A0A] border border-[#F5F1E8]/5 p-6 transition-all duration-300 w-full"
            >
              <div className="absolute top-6 left-6 p-3 bg-[#F5F1E8]/5 rounded-xl border border-[#F5F1E8]/10 text-[#8B5CF6] transition-colors duration-300 group-hover:bg-[#8B5CF6]/10">
                <Github className="w-5 h-5" />
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-[#F5F1E8]/30" />
              </div>

              <div className="absolute bottom-6 left-6">
                <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-[#8B5CF6] uppercase">Development</span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#F5F1E8] mt-1 mb-1">GitHub</h3>
                <p className="text-xs text-[#B8B1A6]">{github.handle} — Side-projects, web design, and tech trials.</p>
              </div>
            </motion.a>
          </motion.div>

          {/* Card 5: LinkedIn */}
          <motion.div variants={cardVariants} className="md:col-span-2">
            <motion.a 
              href={linkedin.url} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.01, borderColor: 'rgba(139, 92, 246, 0.3)', boxShadow: '0 20px 40px rgba(139, 92, 246, 0.08)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative block h-[200px] rounded-2xl bg-[#0A0A0A] border border-[#F5F1E8]/5 p-6 transition-all duration-300 overflow-hidden w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute top-6 left-6 p-3 bg-[#F5F1E8]/5 rounded-xl border border-[#F5F1E8]/10 text-[#8B5CF6] transition-colors duration-300 group-hover:bg-[#8B5CF6]/10">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-[#F5F1E8]/30" />
              </div>

              <div className="absolute bottom-6 left-6">
                <span className="text-[10px] font-sans font-medium tracking-[0.2em] text-[#8B5CF6] uppercase">Professional</span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#F5F1E8] mt-1 mb-1">LinkedIn Network</h3>
                <p className="text-xs text-[#B8B1A6]">{linkedin.handle} — Connecting with visual creators, agencies, and tech innovators.</p>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default MyWorldSection
