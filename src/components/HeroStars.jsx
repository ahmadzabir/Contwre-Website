import React, { useState, useEffect, useRef, useCallback, memo } from 'react'

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

function HeroStars() {
  const [scrollY, setScrollY] = useState(0)
  const [timeOffset, setTimeOffset] = useState(0)
  const animationRef = useRef()
  const lastTimeRef = useRef(0)
  const rafRef = useRef()

  // Generate galaxy-like starfield with varied sizes and colors
  const generateHeroStars = useCallback(() => {
    const stars = []
    
    // Create different star types for galaxy effect - optimized count for performance
    const starTypes = [
      { count: 8, sizeRange: [2, 4], opacityRange: [0.8, 1], color: '#FFFFFF', speedRange: [0.005, 0.01] }, // Bright large stars
      { count: 12, sizeRange: [1, 2], opacityRange: [0.6, 0.8], color: '#00FFFF', speedRange: [0.01, 0.02] }, // Medium cyan stars
      { count: 15, sizeRange: [0.5, 1], opacityRange: [0.4, 0.6], color: '#FFFFFF', speedRange: [0.02, 0.03] }, // Small white stars
      { count: 10, sizeRange: [0.3, 0.6], opacityRange: [0.2, 0.4], color: '#87CEEB', speedRange: [0.03, 0.04] }, // Tiny sky blue stars
      { count: 5, sizeRange: [0.2, 0.4], opacityRange: [0.1, 0.3], color: '#FFFFFF', speedRange: [0.04, 0.05] }, // Micro stars
    ]
    
    starTypes.forEach((type, typeIndex) => {
      for (let i = 0; i < type.count; i++) {
        const size = Math.random() * (type.sizeRange[1] - type.sizeRange[0]) + type.sizeRange[0]
        const opacity = Math.random() * (type.opacityRange[1] - type.opacityRange[0]) + type.opacityRange[0]
        const speed = Math.random() * (type.speedRange[1] - type.speedRange[0]) + type.speedRange[0]
        
        stars.push({
          id: `galaxy-star-${typeIndex}-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: size,
          speed: speed,
          opacity: opacity,
          baseX: Math.random() * 100,
          baseY: Math.random() * 100,
          scrollUpSpeed: Math.random() * 0.20 + 0.12, // Prominent upward movement
          fadeOutPoint: Math.random() * 100 + 50, // Earlier fade out
          driftSpeed: Math.random() * 0.008 + 0.002, // Very slow drift
          twinkleSpeed: Math.random() * 0.015 + 0.005, // Twinkling effect
          color: type.color,
          type: typeIndex, // For different behavior patterns
        })
      }
    })
    
    return stars
  }, [])

  const [stars] = useState(() => generateHeroStars())

  const handleScroll = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY)
      rafRef.current = null
    })
  }, [])

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 32) // 30fps throttling for better performance
    window.addEventListener('scroll', throttledScroll, { passive: true })
    setScrollY(window.scrollY)
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [handleScroll])

  useEffect(() => {
    const animate = (currentTime) => {
      if (currentTime - lastTimeRef.current >= 50) { // 20fps for better performance
        setTimeOffset(currentTime / 5000) // Much slower time progression
        lastTimeRef.current = currentTime
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 2,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      }}
    >
      {stars.map((star) => {
        const time = timeOffset * star.speed
        
        // Different movement patterns based on star type
        let moveX, moveY, driftX, driftY, twinkle
        
        switch (star.type) {
          case 0: // Large bright stars - slowest, most stable
            moveX = Math.sin(time + star.baseX * 0.002) * 0.3
            moveY = Math.cos(time + star.baseY * 0.002) * 0.3
            driftX = Math.sin(time * star.driftSpeed + star.baseX * 0.005) * 0.2
            driftY = Math.cos(time * star.driftSpeed + star.baseY * 0.005) * 0.2
            twinkle = Math.sin(time * star.twinkleSpeed + star.baseX) * 0.1 + 0.9
            break
            
          case 1: // Medium cyan stars - moderate movement
            moveX = Math.sin(time + star.baseX * 0.003) * 0.4
            moveY = Math.cos(time + star.baseY * 0.003) * 0.4
            driftX = Math.sin(time * star.driftSpeed + star.baseX * 0.006) * 0.25
            driftY = Math.cos(time * star.driftSpeed + star.baseY * 0.006) * 0.25
            twinkle = Math.sin(time * star.twinkleSpeed + star.baseX) * 0.15 + 0.85
            break
            
          case 2: // Small white stars - more active
            moveX = Math.sin(time + star.baseX * 0.004) * 0.5
            moveY = Math.cos(time + star.baseY * 0.004) * 0.5
            driftX = Math.sin(time * star.driftSpeed + star.baseX * 0.007) * 0.3
            driftY = Math.cos(time * star.driftSpeed + star.baseY * 0.007) * 0.3
            twinkle = Math.sin(time * star.twinkleSpeed + star.baseX) * 0.2 + 0.8
            break
            
          case 3: // Tiny sky blue stars - most active
            moveX = Math.sin(time + star.baseX * 0.005) * 0.6
            moveY = Math.cos(time + star.baseY * 0.005) * 0.6
            driftX = Math.sin(time * star.driftSpeed + star.baseX * 0.008) * 0.35
            driftY = Math.cos(time * star.driftSpeed + star.baseY * 0.008) * 0.35
            twinkle = Math.sin(time * star.twinkleSpeed + star.baseX) * 0.25 + 0.75
            break
            
          case 4: // Micro stars - subtle but visible
            moveX = Math.sin(time + star.baseX * 0.006) * 0.4
            moveY = Math.cos(time + star.baseY * 0.006) * 0.4
            driftX = Math.sin(time * star.driftSpeed + star.baseX * 0.009) * 0.2
            driftY = Math.cos(time * star.driftSpeed + star.baseY * 0.009) * 0.2
            twinkle = Math.sin(time * star.twinkleSpeed + star.baseX) * 0.3 + 0.7
            break
            
          default:
            moveX = Math.sin(time + star.baseX * 0.003) * 0.5
            moveY = Math.cos(time + star.baseY * 0.003) * 0.5
            driftX = Math.sin(time * star.driftSpeed + star.baseX * 0.008) * 0.3
            driftY = Math.cos(time * star.driftSpeed + star.baseY * 0.008) * 0.3
            twinkle = Math.sin(time * star.twinkleSpeed + star.baseX) * 0.2 + 0.8
        }

        // Scroll-based upward movement and fade out - more prominent effect
        const scrollUpOffset = scrollY * star.scrollUpSpeed
        const scrollFadeOut = Math.max(0, 1 - scrollY / 300) // Fade out over 300px scroll for more visibility
        
        // Calculate final position
        const finalX = (star.x + moveX + driftX) % 100
        const finalY = (star.y + moveY + driftY - scrollUpOffset) % 100

        // Enhanced opacity with twinkling and scroll fade
        const finalOpacity = star.opacity * scrollFadeOut * twinkle

        // Simplified rendering - no expensive box shadows for performance
        return (
          <div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${finalX}%`,
              top: `${finalY}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              opacity: finalOpacity,
              transform: 'translateZ(0)', // GPU acceleration
              willChange: 'opacity', // Only what changes
              transition: 'opacity 0.3s ease-out', // Faster transition
            }}
          />
        )
      })}
    </div>
  )
}

export default memo(HeroStars)