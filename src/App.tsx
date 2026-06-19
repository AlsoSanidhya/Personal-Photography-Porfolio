import { AnimatePresence, useScroll } from 'framer-motion'
import Preloader from './components/ui/Preloader'
import { useEffect, useState } from 'react'
import { PORTFOLIO_DATA } from './data/portfolioData'
import ParticleField from './components/ui/ParticleField'
import HeroSection from './sections/HeroSection'
import MarqueeSection from './sections/MarqueeSection'
import AboutSection from './sections/AboutSection'
import GallerySection from './sections/GallerySection'
import MyWorldSection from './sections/MyWorldSection'
import StoriesSection from './sections/StoriesSection'
import ContactSection from './sections/ContactSection'
import GlobalCameraMorph from './components/ui/GlobalCameraMorph'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = `${PORTFOLIO_DATA.personal.name} -- Photography Portfolio`
  }, [])

  const { scrollYProgress } = useScroll()

  return (
    <div className="bg-[#050505] min-h-screen text-[#F5F1E8] select-none relative z-20">
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>
      
      {!loading && (
        <>
          <GlobalCameraMorph scrollProgress={scrollYProgress} />

          <ParticleField />

          <HeroSection />
          <MarqueeSection />
          <AboutSection />
          <GallerySection />
          <MyWorldSection />
          <StoriesSection />
          <ContactSection />
        </>
      )}
    </div>
  )
}

export default App
