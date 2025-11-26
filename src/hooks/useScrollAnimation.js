import { useEffect, useRef, useState } from 'react'

export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return [ref, isVisible]
}

export const useParallax = () => {
  const [offset, setOffset] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return // Prevent multiple RAF calls
      rafRef.current = requestAnimationFrame(() => {
        setOffset(window.pageYOffset)
        rafRef.current = null
      })
    }

    // Throttle scroll events
    let scrollTimeout = null
    const throttledScroll = () => {
      if (scrollTimeout) return
      scrollTimeout = setTimeout(() => {
        handleScroll()
        scrollTimeout = null
      }, 16) // ~60fps max
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [])

  return offset
}












