import React, { useEffect, useState, useRef } from 'react'

interface LazyMountProps {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
}

const LazyMount: React.FC<LazyMountProps> = ({ 
  children, 
  threshold = 0, 
  rootMargin = '1000px 0px' 
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMounted) return

    const currentRef = ref.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMounted(true)
          observer.unobserve(currentRef)
        }
      },
      {
        rootMargin,
        threshold
      }
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [isMounted, rootMargin, threshold])

  if (!isMounted) {
    return <div ref={ref} style={{ height: '1px', pointerEvents: 'none', visibility: 'hidden' }} aria-hidden="true" />
  }

  return <>{children}</>
}

export default LazyMount
