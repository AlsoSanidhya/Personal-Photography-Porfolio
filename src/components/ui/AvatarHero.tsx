import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface AvatarHeroProps {
  name: string
}

export const AvatarHero: React.FC<AvatarHeroProps> = ({ name }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Hover & Active States
  const [isHovered, setIsHovered] = useState(false)
  
  // Motion values for tilt effect
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  
  // Smooth spring configuration
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const smoothRotateX = useSpring(rotateX, springConfig)
  const smoothRotateY = useSpring(rotateY, springConfig)
  
  // Mouse position within card for shine & parallax highlights
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)
  
  // Transform shine and reflection position
  const shineX = useTransform(smoothMouseX, [-150, 150], ["0%", "100%"])
  const shineY = useTransform(smoothMouseY, [-200, 200], ["0%", "100%"])
  
  // Transform background glow position
  const glowX = useTransform(smoothMouseX, [-150, 150], ["-20%", "20%"])
  const glowY = useTransform(smoothMouseY, [-200, 200], ["-20%", "20%"])
  
  // Parallax shifts for floating decoration layers
  const floatDecoX = useTransform(smoothMouseX, [-150, 150], [-25, 25])
  const floatDecoY = useTransform(smoothMouseY, [-200, 200], [-35, 35])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    
    // Get mouse position relative to card center
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    
    // Set tilt degrees (max 12deg tilt)
    rotateX.set(-y / (rect.height / 24))
    rotateY.set(x / (rect.width / 24))
    
    // Save raw coordinate differences for shine/glow calculations
    mouseX.set(x)
    mouseY.set(y)
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
    mouseX.set(0)
    mouseY.set(0)
  }
  
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  // Floating keyframe animation combined with the mouse tilt
  const floatingAnimation = {
    y: [0, -12, 0],
    rotate: [0, 0.5, -0.5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px] aspect-[4/5] mx-auto select-none">
      
      {/* 1. Dynamic Violet Backlight Glow (Layer behind the card, responds to mouse) */}
      <motion.div
        style={{
          x: glowX,
          y: glowY,
        }}
        className="absolute inset-[-10%] rounded-full bg-radial-glow opacity-40 blur-[80px] pointer-events-none z-0"
        animate={{
          scale: isHovered ? 1.15 : 1.0,
          opacity: isHovered ? 0.5 : 0.35,
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* 2. Floating Parallax Dust Particles (Background Layer) */}
      <motion.div
        style={{
          x: useTransform(floatDecoX, (v) => -v * 0.4),
          y: useTransform(floatDecoY, (v) => -v * 0.4),
        }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        {/* Violet Lens Flare Dot 1 */}
        <div className="absolute top-1/4 left-[-15%] w-6 h-6 rounded-full bg-[#A78BFA] opacity-20 blur-[6px] animate-pulse" />
        {/* Soft White Sparkle 2 */}
        <div className="absolute bottom-1/3 right-[-20%] w-4 h-4 rounded-full bg-white opacity-15 blur-[4px]" />
      </motion.div>

      {/* 3. Main Interactive 3D Card Wrapper */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={floatingAnimation}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d",
          perspective: 1000
        }}
        className="relative w-full h-full rounded-[24px] sm:rounded-[36px] overflow-hidden border border-[#F5F1E8]/10 bg-[#0A0A0E] shadow-[0_45px_80px_-20px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing z-10"
      >
        {/* Inner shadow/border highlight */}
        <div className="absolute inset-0 rounded-[24px] sm:rounded-[36px] border border-white/5 pointer-events-none z-30" />
        
        {/* 3D Depth Card Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F15] to-[#050508] pointer-events-none z-0" />

        {/* 3D Inner Layer: Avatar Image itself */}
        <motion.div
          style={{
            transform: "translateZ(30px)",
            scale: 1.02
          }}
          className="relative w-full h-full z-10"
        >
          <img
            src="/avatar.png"
            alt={`${name} Avatar`}
            className="w-full h-full object-cover pointer-events-none"
          />
        </motion.div>

        {/* 3D Inner Layer: Dynamic Lighting Overlay / Shine Reflection */}
        <motion.div
          style={{
            background: `radial-gradient(circle 220px at ${shineX} ${shineY}, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 80%)`,
            transform: "translateZ(40px)"
          }}
          className="absolute inset-0 pointer-events-none z-20"
        />

        {/* Fine-grain noise texture overlay for analog feel */}
        <div className="absolute inset-0 opacity-[0.015] bg-noise pointer-events-none z-25" />

        {/* Vignette shadow */}
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none z-20" />
      </motion.div>

      {/* 4. Foreground Floating Parallax Decorative Layers (Pop out of the card boundaries!) */}
      <motion.div
        style={{
          x: floatDecoX,
          y: floatDecoY,
          transform: "translateZ(80px)",
        }}
        className="absolute inset-0 pointer-events-none z-20"
      >
        {/* Interactive Film Frame 1 */}
        <motion.div
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] right-[-12%] w-[64px] sm:w-[84px] aspect-[4/3] rounded-[8px] bg-black/40 backdrop-blur-[4px] border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex items-center justify-center p-1 text-[8px] text-white/40 font-mono tracking-widest overflow-hidden"
        >
          <div className="absolute top-0 bottom-0 left-1 w-1.5 border-r border-dashed border-white/20" />
          <div className="absolute top-0 bottom-0 right-1 w-1.5 border-l border-dashed border-white/20" />
          <div className="w-[80%] h-[80%] rounded-[4px] bg-[#1E1B4B]/20 border border-white/5 flex items-center justify-center">
            <span className="text-[6px] opacity-60">RAW-24</span>
          </div>
        </motion.div>

        {/* Interactive Film Frame 2 */}
        <motion.div
          animate={{ rotate: [0, -4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] left-[-15%] w-[55px] sm:w-[75px] aspect-square rounded-[8px] bg-black/40 backdrop-blur-[4px] border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex items-center justify-center p-1 text-[8px] text-white/40 font-mono tracking-widest overflow-hidden"
        >
          <div className="absolute top-0 bottom-0 left-1 w-1.5 border-r border-dashed border-white/20" />
          <div className="absolute top-0 bottom-0 right-1 w-1.5 border-l border-dashed border-white/20" />
          <div className="w-[80%] h-[80%] rounded-[4px] bg-[#3B0764]/20 border border-white/5 flex items-center justify-center">
            <span className="text-[6px] opacity-60">ISO 100</span>
          </div>
        </motion.div>

        {/* Elegant Violet/Lavender Aperture Ring Outline floating near bottom right */}
        <div className="absolute bottom-[10%] right-[-8%] w-16 h-16 rounded-full border border-dashed border-[#A78BFA]/20 animate-[spin_20s_linear_infinite]" />
      </motion.div>
    </div>
  )
}

export default AvatarHero
