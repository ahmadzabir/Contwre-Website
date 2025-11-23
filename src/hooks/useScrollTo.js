import { useCallback } from 'react'

/**
 * Custom hook for smooth scrolling to sections
 */
export const useScrollTo = () => {
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [])

  return { scrollToSection }
}

/**
 * Custom hook for scroll-based animations
 */
export const useScrollAnimation = () => {
  const isElementInView = useCallback((element, threshold = 0.1) => {
    if (!element) return false
    
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight
    
    return (
      rect.top <= windowHeight * (1 - threshold) &&
      rect.bottom >= windowHeight * threshold
    )
  }, [])

  return { isElementInView }
}











