import { AnimatePresence } from 'framer-motion'
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
const LazyMount = lazy(() => import('./components/ui/LazyMount'))

function App() {
  const [sitePhase, setSitePhase] = useState<'preloader' | 'welcome' | 'reveal'>('preloader')
  const [welcomeOverlayMounted, setWelcomeOverlayMounted] = useState(true)

  useEffect(() => {
    document.title = `${PORTFOLIO_DATA.personal.name} -- Photography Portfolio`
  }, [])

  useEffect(() => {
    if (sitePhase === 'welcome') {
      // Transition to reveal after the 4.9 seconds Welcome animation completes
      const phaseTimer = setTimeout(() => {
        setSitePhase('reveal')
      }, 4900)

      return () => {
        clearTimeout(phaseTimer)
      }
    }
  }, [sitePhase])

  useEffect(() => {
    if (sitePhase === 'reveal') {
      // Unmount the welcome overlay immediately once the reveal phase starts
      setWelcomeOverlayMounted(false)
    }
  }, [sitePhase])

  const isReveal = sitePhase === 'reveal'

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="bg-[#050505] min-h-screen text-[#F5F1E8] select-none relative z-20">
        {/* Global Preloader Phase */}
        <AnimatePresence mode="wait">
          {sitePhase === 'preloader' && (
            <Preloader key="preloader" onComplete={() => setSitePhase('welcome')} />
          )}
        </AnimatePresence>

        {/* Global Premium Luxury Welcome Overlay Phase */}
        {welcomeOverlayMounted && sitePhase !== 'preloader' && (
          <div
            className="fixed inset-0 bg-[#000000] z-[9990] select-none pointer-events-none"
            style={{
              pointerEvents: sitePhase === 'reveal' ? 'none' : 'auto',
            }}
          >
            {/* Soft Warm Radial Glow */}
            <div 
              className="absolute inset-0 z-0 animate-luxury-glow pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(245, 241, 232, 1) 0%, rgba(0, 0, 0, 0) 75%)',
              }}
            />

            {/* Fixed-size centering wrapper for the text */}
            <div 
              className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
              style={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
              }}
            >
              <span
                className="font-serif italic select-none text-center bg-gradient-to-b from-[#FFFFFF] via-[#F5F1E8] to-[#B8B1A6] bg-clip-text text-transparent tracking-[0.15em] animate-luxury-welcome pointer-events-auto"
                style={{
                  display: 'inline-block',
                  fontSize: 'clamp(65px, 9.5vw, 135px)',
                  fontWeight: 300,
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  textRendering: 'optimizeLegibility',
                  lineHeight: '1.2',
                  transformOrigin: 'center center',
                  backfaceVisibility: 'hidden',
                  transform: 'translate3d(0, 0, 0)',
                  willChange: 'opacity, transform, filter',
                }}
              >
                Welcome
              </span>
            </div>
          </div>
        )}

        {/* Main website components - always mounted for WebGL scene pre-compilation, opacity managed via isReveal */}
        {sitePhase !== 'preloader' && (
          <>
            <HeroSection isReveal={isReveal} />
            <Suspense fallback={null}>
              <GlobalCameraMorph isReveal={isReveal} />
              <ParticleField isReveal={isReveal} />
              <LazyMount rootMargin="800px 0px">
                <MarqueeSection />
              </LazyMount>
              <LazyMount rootMargin="1200px 0px">
                <AboutSection />
                <GallerySection />
                <MyWorldSection />
                <ContactSection />
              </LazyMount>
              <AudioPlayer />
            </Suspense>
          </>
        )}
      </div>
    </ReactLenis>
  )
}

export default App
