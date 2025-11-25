import React, { useState, useEffect, useCallback, memo } from 'react'
import { motion } from 'framer-motion'

// Throttle function for performance
const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    setIsScrolled(scrollY > 10)
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    setScrollProgress(totalHeight > 0 ? scrollY / totalHeight : 0)
  }, [])

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 100) // Reduced frequency for better performance
    window.addEventListener('scroll', throttledScroll, { passive: true })
    handleScroll() // Initial call
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [handleScroll])

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <motion.nav 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled 
          ? 'bg-bg/98 border-b border-white/30 shadow-lg' 
          : 'bg-bg/90 border-b border-white/15'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ 
        willChange: 'auto'
      }}
    >
      <div className="w-full max-w-7xl mx-auto container-padding">
        <div className="flex items-center justify-between h-16">
          {/* Brand - 10% smaller */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <motion.a 
              href="#top"
              className="block"
              whileHover={{ rotate: 2 }}
              transition={{ duration: 0.2 }}
            >
              <img 
                loading="lazy"
                src="/assets/contwre-logo-white.png"
                alt="Contwre Logo"
                className="h-8 w-auto"
              />
            </motion.a>
          </motion.div>

          {/* Book an Audit Button */}
          <motion.button 
            onClick={() => scrollToSection('top')}
            className="btn-primary"
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Book an Audit</span>
            <motion.div
              animate={{ x: [0, 2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>

        </div>

        {/* Enhanced Scroll Progress Indicator */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500 rounded-full shadow-lg transition-transform duration-150 ease-out"
          style={{
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: "left",
            boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)"
          }}
        />
      </div>
    </motion.nav>
  )
}

export default memo(Header)
