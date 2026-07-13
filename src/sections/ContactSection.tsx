import React, { useState } from 'react'
import { Mail, Copy, Check } from 'lucide-react'
import { Instagram, Linkedin, Github } from '../components/ui/Icons'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import FadeIn from '../components/ui/FadeIn'
import ParallaxText from '../components/ui/ParallaxText'

export const ContactSection: React.FC = () => {
  const { name, email } = PORTFOLIO_DATA.personal
  const socials = PORTFOLIO_DATA.socials
  const [copied, setCopied] = useState(false)

  const getSocial = (name: string) => socials.find(s => s.name.toLowerCase().includes(name.toLowerCase())) || { name, url: '#' }

  const insta = getSocial('instagram')
  const linkedin = getSocial('linkedin')
  const github = getSocial('github')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email: ', err)
    }
  }

  return (
    <footer id="contact" className="relative bg-transparent text-[#F5F1E8] px-6 md:px-10 pt-24 pb-12 select-none border-t border-[#F5F1E8]/5 z-10">
      {/* Cinematic radial background glow */}
      <div className="absolute inset-0 cinematic-glow pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col justify-between min-h-[50vh]">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <FadeIn y={35} duration={1.2} className="max-w-md">
            <span className="text-xs font-semibold tracking-[0.2em] text-[#8B5CF6] uppercase mb-2 block">
              Collaboration
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-[#F5F1E8]">
              Let&apos;s capture something unforgettable together.
            </h2>
          </FadeIn>

          <FadeIn y={35} delay={0.15} duration={1.2} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sheeshsanidhya@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#F5F1E8]/5 border border-[#F5F1E8]/10 px-8 py-4 rounded-3xl hover:bg-[#F5F1E8]/10 hover:border-[#8B5CF6]/30 active:scale-95 transition-all duration-300 group cursor-pointer text-[#F5F1E8] w-full sm:w-auto"
            >
              <Mail className="w-5 h-5 text-[#8B5CF6] group-hover:scale-110 transition-transform duration-300" />
              <span className="font-sans font-medium tracking-wide uppercase text-sm sm:text-base">
                {email}
              </span>
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-3 bg-[#F5F1E8]/5 border border-[#F5F1E8]/10 px-8 py-4 rounded-3xl hover:bg-[#F5F1E8]/10 hover:border-[#8B5CF6]/30 active:scale-95 transition-all duration-300 group cursor-pointer text-[#F5F1E8] w-full sm:w-auto"
            >
              {copied ? (
                <Check className="w-5 h-5 text-emerald-400 scale-110 transition-transform duration-300" />
              ) : (
                <Copy className="w-5 h-5 text-[#8B5CF6] group-hover:scale-110 transition-transform duration-300" />
              )}
              <span className="font-sans font-medium tracking-wide uppercase text-sm sm:text-base">
                {copied ? 'Copied!' : 'Copy Email'}
              </span>
            </button>
          </FadeIn>
        </div>

        {/* Big visual banner */}
        <div className="overflow-hidden mb-16">
          <FadeIn y={50} delay={0.2} duration={1.2}>
            <ParallaxText baseY={80}>
              <h1 className="hero-heading uppercase tracking-tighter text-center leading-none text-[12vw] sm:text-[13vw] select-none opacity-80">
                Get In Touch
              </h1>
            </ParallaxText>
          </FadeIn>
        </div>

        {/* Footer Bottom info */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#F5F1E8]/5 pt-8 gap-8 md:gap-6 text-sm text-[#B8B1A6]">
          <FadeIn y={10} delay={0.3} duration={1.2}>
            <p className="text-center md:text-left">© {new Date().getFullYear()} {name}. ALL RIGHTS RESERVED.</p>
          </FadeIn>

          <FadeIn y={10} delay={0.4} duration={1.2} className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center w-full sm:w-auto">
            <a href={insta.url} target="_blank" rel="noopener noreferrer" className="text-[#B8B1A6] hover:text-[#F5F1E8] transition-colors duration-200 uppercase tracking-widest text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-2 w-full sm:w-auto py-2 sm:py-0">
              <Instagram className="w-4 h-4" /> Instagram
            </a>
            <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className="text-[#B8B1A6] hover:text-[#F5F1E8] transition-colors duration-200 uppercase tracking-widest text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-2 w-full sm:w-auto py-2 sm:py-0">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href={github.url} target="_blank" rel="noopener noreferrer" className="text-[#B8B1A6] hover:text-[#F5F1E8] transition-colors duration-200 uppercase tracking-widest text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-2 w-full sm:w-auto py-2 sm:py-0">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </FadeIn>
        </div>
      </div>
    </footer>
  )
}

export default ContactSection
