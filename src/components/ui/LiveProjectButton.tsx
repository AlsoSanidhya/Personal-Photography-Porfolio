import React from 'react'
import { motion } from 'framer-motion'

interface LiveProjectButtonProps {
  label?: string
  onClick?: () => void
  className?: string
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ 
  label = 'Live Project', 
  onClick, 
  className = '' 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(215, 226, 234, 0.1)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest text-sm sm:text-base cursor-pointer select-none transition-all duration-300 ${className}`}
    >
      <span className="px-8 py-3 sm:px-10 sm:py-3.5 block">
        {label}
      </span>
    </motion.button>
  )
}

export default LiveProjectButton
