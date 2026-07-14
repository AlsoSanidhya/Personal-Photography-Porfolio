import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Pause, Info, X } from 'lucide-react'

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    // Initialize audio element
    audioRef.current = new Audio('/music/ambient.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0 // Start at 0 for fade in

    // Check saved preference
    const savedPreference = localStorage.getItem('music-preference')
    if (savedPreference === 'true') {
      setIsPlaying(true)
      // Attempt to play if allowed by browser policy
      audioRef.current.play().then(() => {
        fadeIn()
      }).catch(() => {
        // Autoplay blocked by browser, reset to paused state
        setIsPlaying(false)
        localStorage.setItem('music-preference', 'false')
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    }
  }, [])

  const fadeIn = () => {
    if (!audioRef.current) return
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    
    let vol = audioRef.current.volume
    const targetVol = 0.25
    const step = targetVol / 20 // 20 steps over 1 second = 50ms per step

    fadeIntervalRef.current = window.setInterval(() => {
      if (audioRef.current) {
        vol += step
        if (vol >= targetVol) {
          vol = targetVol
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
        }
        audioRef.current.volume = vol
      }
    }, 50)
  }

  const fadeOutAndPause = () => {
    if (!audioRef.current) return
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
    
    let vol = audioRef.current.volume
    const targetVol = 0
    const step = vol / 20 // 20 steps over 1 second = 50ms per step

    fadeIntervalRef.current = window.setInterval(() => {
      if (audioRef.current) {
        vol -= step
        if (vol <= targetVol) {
          vol = targetVol
          audioRef.current.pause()
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current)
        }
        audioRef.current.volume = vol
      }
    }, 50)
  }

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      fadeOutAndPause()
      setIsPlaying(false)
      localStorage.setItem('music-preference', 'false')
    } else {
      audioRef.current.play().then(() => {
        fadeIn()
        setIsPlaying(true)
        localStorage.setItem('music-preference', 'true')
      }).catch(err => console.error("Playback failed:", err))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 1, ease: 'easeOut' }}
      className="fixed bottom-6 right-6 z-[9900] flex flex-col items-end gap-3"
    >
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-[280px] sm:w-[320px] p-6 rounded-2xl backdrop-blur-2xl bg-[#050505]/80 border border-[#F5F1E8]/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] origin-bottom-right"
          >
            <div className="flex flex-col gap-4 text-left select-none">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#8B5CF6] uppercase">Now Playing</span>
                <h4 className="font-serif text-xl text-[#F5F1E8] mt-1">Go Baby</h4>
                <p className="text-sm font-light tracking-[0.05em] text-[#B8B1A6]">Justin Bieber</p>
              </div>
              <div className="h-[1px] w-full bg-[#F5F1E8]/10 my-1" />
              <div className="flex flex-col gap-3 text-[11px] font-light tracking-[0.05em] text-[#B8B1A6]/60 leading-relaxed">
                <p>Music featured for atmosphere and artistic presentation.</p>
                <p>&copy; All rights belong to Justin Bieber, his record label, and the respective copyright holders.</p>
                <p>Used for personal portfolio demonstration only.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <motion.button
          onClick={() => setShowInfo(!showInfo)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`group flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-xl border transition-all duration-500 ${
            showInfo 
              ? 'bg-[#8B5CF6]/10 border-[#8B5CF6]/30 shadow-[0_0_15px_rgba(139,92,246,0.1)]' 
              : 'bg-[#F5F1E8]/5 border-[#F5F1E8]/10 hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6]/30'
          }`}
        >
          {showInfo ? (
            <X className="w-4 h-4 text-[#8B5CF6] group-hover:text-[#F5F1E8] transition-colors duration-300" />
          ) : (
            <Info className="w-4 h-4 text-[#B8B1A6] group-hover:text-[#F5F1E8] transition-colors duration-300" />
          )}
        </motion.button>

        <motion.button
          onClick={toggleMusic}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`group relative flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-xl border transition-all duration-500 overflow-hidden ${
            isPlaying 
              ? 'bg-[#8B5CF6]/10 border-[#8B5CF6]/30 shadow-[0_0_20px_rgba(139,92,246,0.15)]' 
              : 'bg-[#F5F1E8]/5 border-[#F5F1E8]/10 hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6]/30'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5CF6]/0 to-[#8B5CF6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <Pause className="w-5 h-5 text-[#8B5CF6]" fill="currentColor" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <Music className="w-5 h-5 text-[#B8B1A6] group-hover:text-[#F5F1E8] transition-colors duration-300" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default AudioPlayer
