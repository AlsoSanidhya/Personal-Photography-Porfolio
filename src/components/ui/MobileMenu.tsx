import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface MobileMenuProps {
  onNavigate: (id: string) => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const links = ['About', 'Gallery', 'Contact']

  const handleNav = (id: string) => {
    setIsOpen(false)
    setTimeout(() => onNavigate(id), 300) // wait for exit animation
  }

  const menuVariants: any = {
    closed: {
      opacity: 0,
      y: '-100%',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  } as any

  const linkVariants: any = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  }

  return (
    <div className="flex md:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-[#F5F1E8] hover:text-[#8B5CF6] transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[9999] bg-[#050505]/95 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-[#F5F1E8] hover:text-[#8B5CF6] transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col items-center gap-10">
              <motion.span
                custom={0}
                variants={linkVariants}
                onClick={() => handleNav('hero')}
                className="font-serif tracking-[0.14em] text-lg text-[#8B5CF6] uppercase cursor-pointer"
              >
                Beyond The Frame
              </motion.span>
              
              <div className="w-12 h-[1px] bg-[#F5F1E8]/10" />

              {links.map((item, i) => (
                <motion.button
                  key={item}
                  custom={i + 1}
                  variants={linkVariants}
                  onClick={() => handleNav(item.toLowerCase())}
                  className="uppercase tracking-[0.3em] font-sans font-medium text-2xl text-[#F5F1E8] hover:text-[#8B5CF6] transition-colors cursor-pointer"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MobileMenu
