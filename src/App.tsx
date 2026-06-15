import { useEffect } from 'react'
import { PORTFOLIO_DATA } from './data/portfolioData'
import HeroSection from './sections/HeroSection'
import MarqueeSection from './sections/MarqueeSection'
import AboutSection from './sections/AboutSection'
import GallerySection from './sections/GallerySection'
import MyWorldSection from './sections/MyWorldSection'
import StoriesSection from './sections/StoriesSection'
import ContactSection from './sections/ContactSection'

function App() {
  useEffect(() => {
    document.title = `${PORTFOLIO_DATA.personal.name} -- Photography Portfolio`
  }, [])

  return (
    <div className="bg-[#0C0C0C] min-h-screen text-white select-none overflow-x-clip">
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

