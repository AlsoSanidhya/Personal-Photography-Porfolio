import React from 'react'
import { motion } from 'framer-motion'
import { Music, Sparkles, ArrowUpRight } from 'lucide-react'
import { Instagram, Github, Linkedin } from '../components/ui/Icons'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import FadeIn from '../components/ui/FadeIn'

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

  return (
    <section id="my-world" className="relative bg-[#0C0C0C] text-white px-5 sm:px-8 md:px-10 py-24 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <FadeIn y={40} className="mb-14 text-center sm:text-left">
          <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-2 block">
            Digital Identity
          </span>
          <h2 className="hero-heading font-black uppercase tracking-tight leading-none text-[3.5rem] sm:text-[6vw] md:text-[80px]">
            My World
          </h2>
        </FadeIn>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Instagram (Large Square) */}
          <FadeIn delay={0.05} className="md:col-span-2 md:row-span-2">
            <motion.a 
              href={insta.url} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.01, borderColor: 'rgba(168, 85, 247, 0.4)', boxShadow: '0 20px 40px rgba(168, 85, 247, 0.15)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative block h-[320px] sm:h-[400px] md:h-[450px] rounded-3xl bg-[#161616] border border-white/5 overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-45 transition-opacity duration-500" style={{ backgroundImage: `url('${instagramPreview}')` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
              
              <div className="absolute top-6 left-6 p-3 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 text-violet-400 transition-colors duration-300 group-hover:bg-violet-400/10">
                <Instagram className="w-6 h-6 animate-pulse" />
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-white/50 animate-bounce" />
              </div>

              <div className="absolute bottom-8 left-8">
                <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase">Lifestyle & Captures</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-1 mb-2">Instagram Feed</h3>
                <p className="text-sm text-slate-400 max-w-sm">{insta.handle} — Snapshotting street chronicles, aesthetics, and travel glimpses.</p>
              </div>
            </motion.a>
          </FadeIn>

          {/* Card 2: Spotify */}
          <FadeIn delay={0.15}>
            <motion.a 
              href={spotify.url} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.02, borderColor: 'rgba(16, 185, 129, 0.4)', boxShadow: '0 20px 40px rgba(16, 185, 129, 0.15)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative block h-[200px] sm:h-[210px] md:h-[210px] rounded-3xl bg-[#161616] border border-white/5 p-6 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-6 left-6 p-3 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 text-emerald-400 transition-colors duration-300 group-hover:bg-emerald-400/10">
                <Music className="w-6 h-6" />
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-white/50" />
              </div>
              
              <div className="absolute bottom-6 left-6">
                <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">Soundtrack</span>
                <h3 className="text-xl font-bold mt-1 mb-1">Spotify Playlist</h3>
                <p className="text-xs text-slate-400">{spotify.handle} — Curated tunes for editing, running, and creating.</p>
              </div>
            </motion.a>
          </FadeIn>

          {/* Card 3: Creative Projects */}
          <FadeIn delay={0.25} className="md:col-span-1">
            <motion.a 
              href={projects.url} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.02, borderColor: 'rgba(245, 158, 11, 0.4)', boxShadow: '0 20px 40px rgba(245, 158, 11, 0.15)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative block h-[200px] sm:h-[210px] md:h-[216px] rounded-3xl bg-[#161616] border border-white/5 p-6 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-6 left-6 p-3 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 text-amber-400 transition-colors duration-300 group-hover:bg-amber-400/10">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-white/50" />
              </div>

              <div className="absolute bottom-6 left-6">
                <span className="text-xs font-semibold tracking-widest text-amber-400 uppercase">EXPERIMENTS</span>
                <h3 className="text-xl font-bold mt-1 mb-1">Creative Projects</h3>
                <p className="text-xs text-slate-400">{projects.handle} — Personal experiments in photo editing, Lightroom workflows, design concepts, web projects, and creative ideas.</p>
              </div>
            </motion.a>
          </FadeIn>

          {/* Card 4: GitHub */}
          <FadeIn delay={0.3}>
            <motion.a 
              href={github.url} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.02, borderColor: 'rgba(255, 255, 255, 0.2)', boxShadow: '0 20px 40px rgba(255, 255, 255, 0.08)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative block h-[200px] rounded-3xl bg-[#161616] border border-white/5 p-6 transition-all duration-300"
            >
              <div className="absolute top-6 left-6 p-3 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 text-slate-300 transition-colors duration-300 group-hover:bg-white/10">
                <Github className="w-6 h-6" />
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-white/50" />
              </div>

              <div className="absolute bottom-6 left-6">
                <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Development</span>
                <h3 className="text-xl font-bold mt-1 mb-1">GitHub</h3>
                <p className="text-xs text-slate-400">{github.handle} — Side-projects, web design, and tech trials.</p>
              </div>
            </motion.a>
          </FadeIn>

          {/* Card 5: LinkedIn */}
          <FadeIn delay={0.35} className="md:col-span-2">
            <motion.a 
              href={linkedin.url} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.01, borderColor: 'rgba(59, 130, 246, 0.4)', boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative block h-[200px] rounded-3xl bg-[#161616] border border-white/5 p-6 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute top-6 left-6 p-3 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 text-[#0077B5] transition-colors duration-300 group-hover:bg-[#0077B5]/10">
                <Linkedin className="w-6 h-6" />
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-5 h-5 text-white/50" />
              </div>

              <div className="absolute bottom-6 left-6">
                <span className="text-xs font-semibold tracking-widest text-[#0077B5] uppercase">Professional</span>
                <h3 className="text-xl font-bold mt-1 mb-1">LinkedIn Network</h3>
                <p className="text-xs text-slate-400">{linkedin.handle} — Connecting with visual creators, agencies, and tech innovators.</p>
              </div>
            </motion.a>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export default MyWorldSection
