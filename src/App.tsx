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

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = `${PORTFOLIO_DATA.personal.name} -- Photography Portfolio`

    const handleLoad = () => {
      setLoading(false)
    }

    const timeout = setTimeout(() => {
      setLoading(false)
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="bg-[#050505] min-h-screen text-[#F5F1E8] select-none overflow-x-clip relative z-20">
      {loading && <Preloader />}
      <ParticleField />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <GallerySection />
      <MyWorldSection />
      <StoriesSection />
      <ContactSection />
    </div>
  )
}

export default App

