import React from 'react'
import { Mail } from 'lucide-react'
import { Instagram, Linkedin, Github } from '../components/ui/Icons'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import FadeIn from '../components/ui/FadeIn'

export const ContactSection: React.FC = () => {
  const { name, email } = PORTFOLIO_DATA.personal
  const socials = PORTFOLIO_DATA.socials

  const getSocial = (name: string) => socials.find(s => s.name.toLowerCase().includes(name.toLowerCase())) || { name, url: '#' }

  const insta = getSocial('instagram')
  const linkedin = getSocial('linkedin')
  const github = getSocial('github')

  return (
    <footer id="contact" className="relative bg-[#0C0C0C] text-white px-6 md:px-10 pt-24 pb-12 select-none border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col justify-between min-h-[50vh]">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <FadeIn y={35} className="max-w-md">
            <span className="text-xs font-semibold tracking-widest text-violet-400 uppercase mb-2 block">
              Collaboration
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Let&apos;s capture something unforgettable together.
            </h2>
          </FadeIn>

          <FadeIn y={35} delay={0.15}>
            <a 
              href={`mailto:${email}`}
              className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-3xl hover:bg-white/10 hover:border-violet-500/20 transition-all duration-300 group cursor-pointer"
            >
              <Mail className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium tracking-wide uppercase text-sm sm:text-base">
                {email}
              </span>
            </a>
          </FadeIn>
        </div>

        {/* Big visual banner */}
        <div className="overflow-hidden mb-16">
          <FadeIn y={50} delay={0.2} duration={0.8}>
            <h1 className="hero-heading font-black uppercase tracking-tighter text-center leading-none text-[12vw] sm:text-[13vw] select-none opacity-80">
              Get In Touch
            </h1>
          </FadeIn>
        </div>

        {/* Footer Bottom info */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/5 pt-8 gap-6 text-sm text-slate-500">
          <FadeIn y={10} delay={0.3}>
            <p>© {new Date().getFullYear()} {name}. ALL RIGHTS RESERVED.</p>
          </FadeIn>

          <FadeIn y={10} delay={0.4} className="flex gap-6 sm:gap-8">
            <a href={insta.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 uppercase tracking-widest text-xs font-semibold flex items-center gap-2">
              <Instagram className="w-4 h-4" /> Instagram
            </a>
            <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 uppercase tracking-widest text-xs font-semibold flex items-center gap-2">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href={github.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 uppercase tracking-widest text-xs font-semibold flex items-center gap-2">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </FadeIn>
        </div>
      </div>
    </footer>
  )
}

export default ContactSection
