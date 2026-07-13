import { useState, useEffect } from 'react'

export type PerformanceTier = 'high' | 'mid' | 'low'

export function usePerformanceTier(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>('high')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Heuristic assessment based on navigator properties
    // Fallbacks provided for Safari/Firefox which might not expose these APIs
    const hardwareConcurrency = navigator.hardwareConcurrency || 4
    // @ts-expect-error deviceMemory is not in standard TS DOM types yet
    const deviceMemory = navigator.deviceMemory || 4

    // Check if the device is a mobile device based on screen width
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    // Check if the device is specifically in low power mode / prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let calculatedTier: PerformanceTier = 'high'

    if (prefersReducedMotion || isMobile || deviceMemory < 4 || hardwareConcurrency <= 4) {
      calculatedTier = 'low'
    } else if (deviceMemory === 4 || hardwareConcurrency <= 6) {
      calculatedTier = 'mid'
    }

    setTier(calculatedTier)
  }, [])

  return tier
}
