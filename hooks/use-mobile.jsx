import * as React from "react"

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
}

export function useResponsiveDevice() {
  const [device, setDevice] = React.useState({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
    orientation: 'portrait',
    hasTouch: false,
    reducedMotion: false,
  })

  React.useEffect(() => {
    const update = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isMobile = width < BREAKPOINTS.md
      const isTablet = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg
      const isLaptop = width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl
      const isDesktop = width >= BREAKPOINTS.xl
      const hasTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      setDevice({
        width,
        height,
        isMobile,
        isTablet,
        isLaptop,
        isDesktop,
        orientation: height >= width ? 'portrait' : 'landscape',
        hasTouch,
        reducedMotion,
      })
    }

    update()

    let rafId = null
    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    const mediaQuery = window.matchMedia('(pointer: coarse)')
    const mediaListener = mediaQuery.addEventListener ?? mediaQuery.addListener

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('orientationchange', handleResize, { passive: true })
    if (mediaListener) mediaListener.call(mediaQuery, 'change', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleResize)
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleResize)
      }
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return device
}

export function useIsMobile() {
  return useResponsiveDevice().isMobile
}
