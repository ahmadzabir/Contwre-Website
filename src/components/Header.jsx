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
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
    setIsMenuOpen(false)
  }, [])

  return (
    <motion.nav 
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'backdrop-blur-xl bg-bg/95 border-b border-white/30 shadow-xl' 
          : 'backdrop-blur-md bg-bg/85 border-b border-white/15'
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

          {/* Desktop Navigation - 10% smaller */}
          <div className="hidden lg:flex gap-4 items-center">
            {[
              { id: 'engine', label: 'GTM Engine' },
              { id: 'services', label: 'Services' },
              { id: 'results', label: 'Results' },
              { id: 'faq', label: 'FAQ' }
            ].map((item) => (
              <motion.button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/80 hover:text-white transition-colors text-sm font-medium relative group"
                whileHover={{ y: -1 }}
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 group-hover:w-full transition-all duration-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                />
              </motion.button>
            ))}
          </div>

          {/* Book an Audit Button */}
          <motion.button 
            onClick={() => scrollToSection('main-cta')}
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

          {/* Mobile Menu Button - 10% smaller */}
          <motion.button
            className="md:hidden text-white p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div 
          className="md:hidden overflow-hidden"
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pb-4 border-t border-white/10 mt-3 pt-4 space-y-2">
            {[
              { id: 'engine', label: 'GTM Engine' },
              { id: 'services', label: 'Services' },
              { id: 'results', label: 'Results' },
              { id: 'faq', label: 'FAQ' }
            ].map((item, index) => (
              <motion.button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/80 hover:text-white transition-colors text-left py-2 text-sm block w-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
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
