import { AnimatePresence, motion } from 'framer-motion'
import { ReactLenis } from 'lenis/react'
import Preloader from './components/ui/Preloader'
import { useEffect, useState, lazy, Suspense } from 'react'
import { PORTFOLIO_DATA } from './data/portfolioData'
import HeroSection from './sections/HeroSection'

const ParticleField = lazy(() => import('./components/ui/ParticleField'))
const MarqueeSection = lazy(() => import('./sections/MarqueeSection'))
const AboutSection = lazy(() => import('./sections/AboutSection'))
const GallerySection = lazy(() => import('./sections/GallerySection'))
const MyWorldSection = lazy(() => import('./sections/MyWorldSection'))
const ContactSection = lazy(() => import('./sections/ContactSection'))
const GlobalCameraMorph = lazy(() => import('./components/ui/GlobalCameraMorph'))
const AudioPlayer = lazy(() => import('./components/ui/AudioPlayer'))

function App() {
  const [sitePhase, setSitePhase] = useState<'preloader' | 'welcome' | 'reveal'>('preloader')
  const [showHello, setShowHello] = useState(false)

  useEffect(() => {
    document.title = `${PORTFOLIO_DATA.personal.name} -- Photography Portfolio`
  }, [])

  useEffect(() => {
    if (sitePhase === 'welcome') {
      const showTimer = setTimeout(() => {
        setShowHello(true)
      }, 50)

      // Hello stays visible for 2 seconds (0.6s fade-in completes at 650ms, holds for 2.0s)
      const helloTimer = setTimeout(() => {
        setShowHello(false)
      }, 2650)

      // Transition to reveal after Hello fade-out finishes (2.65s + 0.8s)
      const phaseTimer = setTimeout(() => {
        setSitePhase('reveal')
      }, 3450)

      return () => {
        clearTimeout(showTimer)
        clearTimeout(helloTimer)
        clearTimeout(phaseTimer)
      }
    }
  }, [sitePhase])

  const isReveal = sitePhase === 'reveal'

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="bg-[#050505] min-h-screen text-[#F5F1E8] select-none relative z-20">
      {/* Global Preloader Phase */}
      <AnimatePresence mode="wait">
        {sitePhase === 'preloader' && (
          <Preloader onComplete={() => setSitePhase('welcome')} />
        )}
      </AnimatePresence>

      {/* Global Apple-Inspired Welcome Overlay Phase */}
      <AnimatePresence>
        {sitePhase === 'welcome' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#000000] z-[9990] flex items-center justify-center overflow-hidden"
          >
            {/* Subtle premium backlight glow behind text */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
              className="absolute w-[350px] h-[350px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)' }}
            />

            <AnimatePresence>
              {showHello && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.0 }}
                  transition={{ 
                    opacity: { duration: 0.6, ease: 'easeOut' },
                    scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                  }}
                  className="font-serif select-none text-center bg-gradient-to-b from-[#FFFFFF] via-[#F5F1E8]/90 to-[#B8B1A6]/50 bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(255,255,255,0.12)] tracking-[0.16em]"
                  style={{
                    fontSize: 'clamp(76px, 8vw, 110px)'
                  }}
                >
                  Hello
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main website components - always mounted for WebGL scene pre-compilation, opacity managed via isReveal */}
      {sitePhase !== 'preloader' && (
        <>
          <HeroSection isReveal={isReveal} />
          <Suspense fallback={null}>
            <GlobalCameraMorph isReveal={isReveal} />
            <ParticleField isReveal={isReveal} />
            <MarqueeSection />
            <AboutSection />
            <GallerySection />
            <MyWorldSection />
            <ContactSection />
            <AudioPlayer />
          </Suspense>
        </>
      )}
      </div>
    </ReactLenis>
  )
}

export default App
