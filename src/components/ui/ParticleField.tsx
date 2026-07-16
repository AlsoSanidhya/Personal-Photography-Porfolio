import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { usePerformanceTier } from '../../hooks/usePerformanceTier'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseRadius: number
  currentRadius: number
  baseAlpha: number
  currentAlpha: number
  depth: number // 1, 2, or 3
  dispX: number
  dispY: number
}

interface ParticleFieldProps {
  isReveal?: boolean
}

export const ParticleField: React.FC<ParticleFieldProps> = React.memo(({ isReveal = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [reducedMotion, setReducedMotion] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  )
  const performanceTier = usePerformanceTier()
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      const densityMap = {
        high: window.innerWidth < 768 ? 40 : 160,
        mid: window.innerWidth < 768 ? 25 : 80,
        low: window.innerWidth < 768 ? 10 : 40,
      }
      const density = densityMap[performanceTier]
      createParticles(density)
    }

    const createParticles = (count: number) => {
      particles = []
      const w = window.innerWidth
      const h = window.innerHeight

      for (let i = 0; i < count; i++) {
        const depthVal = Math.random()
        let depth = 1 // background
        if (depthVal > 0.82) {
          depth = 3 // foreground
        } else if (depthVal > 0.45) {
          depth = 2 // midground
        }

        const baseRadius = depth === 1 ? 0.5 + Math.random() * 0.4
          : depth === 2 ? 0.9 + Math.random() * 0.5
            : 1.4 + Math.random() * 0.7

        const baseAlpha = depth === 1 ? 0.10 + Math.random() * 0.15
          : depth === 2 ? 0.18 + Math.random() * 0.18
            : 0.30 + Math.random() * 0.22

        const speedScale = depth * 0.15
        const vx = (Math.random() - 0.5) * 0.18 * speedScale
        const vy = -(Math.random() * 0.15 + 0.05) * speedScale

        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx,
          vy,
          baseRadius,
          currentRadius: baseRadius,
          baseAlpha,
          currentAlpha: baseAlpha,
          depth,
          dispX: 0,
          dispY: 0
        })
      }
    }

    setupCanvas()
    window.addEventListener('resize', setupCanvas)

    let lastMouseMoveTime = 0
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastMouseMoveTime < 33) return // Cap to ~30fps
      lastMouseMoveTime = now
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    const hoverRadius = 150
    const pushStrength = 24

    const PI2 = Math.PI * 2
    let isVisible = true
    let isScrolling = false
    let scrollTimeout: ReturnType<typeof setTimeout>

    const handleScroll = () => {
      // Pause calculations if scrolled more than 1.5x screen height
      isVisible = window.scrollY < window.innerHeight * 1.5
      
      // Pause rendering while actively scrolling to prevent stutter
      isScrolling = true
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
      }, 150)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render)
      if (!isVisible || isScrolling) return

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const w = window.innerWidth
      const h = window.innerHeight
      const mouse = mouseRef.current

      if (!reducedMotion) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          
          // Slow organic wave movement to simulate air draft
          const angleOffset = Math.sin(time * 0.0006 + p.x * 0.004) * 0.06 * p.depth
          p.x += p.vx + angleOffset
          p.y += p.vy

          if (p.x < -15) p.x = w + 15
          if (p.x > w + 15) p.x = -15
          if (p.y < -15) p.y = h + 15
          if (p.y > h + 15) p.y = -15

          // Proximity checks
          let targetRadius = p.baseRadius
          let targetAlpha = p.baseAlpha
          let targetDispX = 0
          let targetDispY = 0

          if (performanceTier !== 'low' && mouse.x !== -9999) {
            const dx = (p.x + p.dispX) - mouse.x
            const dy = (p.y + p.dispY) - mouse.y
            const dist = Math.hypot(dx, dy)

            if (dist < hoverRadius) {
              const ratio = 1 - dist / hoverRadius
              targetRadius = p.baseRadius * (1 + ratio * 0.95)
              targetAlpha = Math.min(0.80, p.baseAlpha + (0.85 - p.baseAlpha) * ratio * 0.5)

              const force = ratio * pushStrength * (p.depth * 0.4 + 0.6)
              const angle = Math.atan2(dy, dx)
              targetDispX = Math.cos(angle) * force
              targetDispY = Math.sin(angle) * force
            }
          }

          p.currentRadius += (targetRadius - p.currentRadius) * 0.08
          p.currentAlpha += (targetAlpha - p.currentAlpha) * 0.08
          p.dispX += (targetDispX - p.dispX) * 0.06
          p.dispY += (targetDispY - p.dispY) * 0.06

          ctx.beginPath()
          ctx.arc(p.x + p.dispX, p.y + p.dispY, p.currentRadius, 0, PI2)

          if (p.depth === 3) {
            ctx.fillStyle = `rgba(255,220,170,${p.currentAlpha})`
          } else if (p.depth === 2) {
            ctx.fillStyle = `rgba(180,200,255,${p.currentAlpha})`
          } else {
            ctx.fillStyle = `rgba(220,220,255,${p.currentAlpha * 0.7})`
          }

          ctx.fill()
        }
      } else {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          p.currentRadius = p.baseRadius
          p.currentAlpha = p.baseAlpha * 0.5
          p.dispX = 0
          p.dispY = 0

          ctx.beginPath()
          ctx.arc(p.x + p.dispX, p.y + p.dispY, p.currentRadius, 0, PI2)

          if (p.depth === 3) {
            ctx.fillStyle = `rgba(255,220,170,${p.currentAlpha})`
          } else if (p.depth === 2) {
            ctx.fillStyle = `rgba(180,200,255,${p.currentAlpha})`
          } else {
            ctx.fillStyle = `rgba(220,220,255,${p.currentAlpha * 0.7})`
          }

          ctx.fill()
        }
      }

    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', setupCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [reducedMotion, performanceTier])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={isReveal ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="fixed inset-0 pointer-events-none z-1"
      style={{ mixBlendMode: 'screen' }}
    />
  )
})

export default ParticleField
