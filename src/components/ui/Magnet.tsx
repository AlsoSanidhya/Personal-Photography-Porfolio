import React, { useRef, useState, useEffect } from 'react'

interface MagnetProps {
  children: React.ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [transition, setTransition] = useState(inactiveTransition)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY

      // Check if cursor is within bounding area with padding
      const isWithinBounds =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding

      if (isWithinBounds) {
        setTransition(activeTransition)
        setPosition({
          x: distanceX / strength,
          y: distanceY / strength
        })
      } else {
        setTransition(inactiveTransition)
        setPosition({ x: 0, y: 0 })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [padding, strength, activeTransition, inactiveTransition])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
        transition: transition,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  )
}
export default Magnet
