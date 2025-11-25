import React, { useRef, useEffect, memo } from 'react'

function HeroStars() {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const starsRef = useRef([])
  const scrollYRef = useRef(0)
  const timeRef = useRef(0)
  const heroHeightRef = useRef({ height: 0, top: 0 })
  const section2TopRef = useRef(0)
  const section2HeightRef = useRef(0)

  // Generate stars once - visible night sky stars
  useEffect(() => {
    const stars = []
    // Optimized star count for better performance while maintaining visibility
    const starTypes = [
      { count: 40, sizeRange: [1.5, 2.5], opacityRange: [0.85, 1], color: '#FFFFFF', speedRange: [0.01, 0.02] },
      { count: 50, sizeRange: [1.2, 2], opacityRange: [0.75, 0.95], color: '#FFFFFF', speedRange: [0.02, 0.03] },
      { count: 60, sizeRange: [1, 1.8], opacityRange: [0.7, 0.9], color: '#FFFFFF', speedRange: [0.015, 0.025] },
      { count: 70, sizeRange: [0.8, 1.5], opacityRange: [0.65, 0.85], color: '#FFFFFF', speedRange: [0.02, 0.03] },
      { count: 50, sizeRange: [0.6, 1.2], opacityRange: [0.6, 0.8], color: '#E8E8E8', speedRange: [0.015, 0.025] },
      { count: 40, sizeRange: [0.5, 1], opacityRange: [0.55, 0.75], color: '#F0F0F0', speedRange: [0.02, 0.03] },
    ]
    
    starTypes.forEach((type, typeIndex) => {
      for (let i = 0; i < type.count; i++) {
        const size = Math.random() * (type.sizeRange[1] - type.sizeRange[0]) + type.sizeRange[0]
        const opacity = Math.random() * (type.opacityRange[1] - type.opacityRange[0]) + type.opacityRange[0]
        const speed = Math.random() * (type.speedRange[1] - type.speedRange[0]) + type.speedRange[0]
        
        // Mark 40% of stars to come from behind section 2
        const comesFromBehind = Math.random() < 0.4
        
        stars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: size,
          speed: speed,
          opacity: opacity,
          baseX: Math.random() * 100,
          baseY: Math.random() * 100,
          scrollUpSpeed: Math.random() * 0.20 + 0.12,
          driftSpeed: Math.random() * 0.008 + 0.002,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          color: type.color,
          type: typeIndex,
          comesFromBehind: comesFromBehind, // Mark stars that come from behind section 2
          startY: comesFromBehind ? 100 + Math.random() * 20 : Math.random() * 100, // Start below viewport if coming from behind
        })
      }
    })
    
    starsRef.current = stars
  }, [])

  // Update section measurements on scroll/resize
  const updateSectionMeasurements = () => {
    const heroSection = document.getElementById('top')
    if (heroSection) {
      const heroRect = heroSection.getBoundingClientRect()
      heroHeightRef.current = heroSection.offsetHeight
      // Store hero top position relative to page
      heroHeightRef.current = {
        height: heroSection.offsetHeight,
        top: heroRect.top + window.scrollY
      }
    } else {
      heroHeightRef.current = {
        height: window.innerHeight,
        top: 0
      }
    }
    
    const section2 = document.querySelector('.section-bg-1')
    if (section2) {
      const rect = section2.getBoundingClientRect()
      section2TopRef.current = rect.top + window.scrollY
      section2HeightRef.current = section2.offsetHeight
    } else {
      const heroData = typeof heroHeightRef.current === 'object' ? heroHeightRef.current : { height: window.innerHeight, top: 0 }
      section2TopRef.current = heroData.top + heroData.height
      section2HeightRef.current = window.innerHeight
    }
  }

  // Handle scroll - store in ref, no re-renders
  useEffect(() => {
    // Initial measurement
    updateSectionMeasurements()
    
    const handleScroll = () => {
      scrollYRef.current = window.scrollY
      // Update measurements less frequently (every 100ms)
      if (!handleScroll.lastUpdate || Date.now() - handleScroll.lastUpdate > 100) {
        updateSectionMeasurements()
        handleScroll.lastUpdate = Date.now()
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateSectionMeasurements, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateSectionMeasurements)
    }
  }, [])

  // Canvas animation loop - smooth like video
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true })
    
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    let lastFrameTime = 0
    const targetFPS = 24 // Optimized to 24fps for smooth animation with better performance
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime) => {
      // Throttle to 30fps
      if (currentTime - lastFrameTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrameTime = currentTime
      
      timeRef.current = currentTime / 10000 // Slower time progression
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const scrollY = scrollYRef.current
      const heroData = heroHeightRef.current
      const section2Top = section2TopRef.current
      const section2Height = section2HeightRef.current
      
      // Get hero section data
      const heroTop = heroData.top
      const heroHeight = heroData.height
      
      // Calculate scroll progress through hero section (0 to 1)
      const scrollProgressInHero = (scrollY - heroTop) / heroHeight
      
      // Fade out at 90% of hero section scroll
      const fadeOutStart = 0.90
      const fadeOutEnd = 1.0
      
      // Calculate fade out opacity (0 to 1, where 1 is fully visible)
      let scrollFadeOut = 1
      
      if (scrollProgressInHero < fadeOutStart) {
        // Before fade out starts (0-90% of hero) - fully visible
        scrollFadeOut = 1
      } else if (scrollProgressInHero >= fadeOutStart && scrollProgressInHero < fadeOutEnd) {
        // Fading out between 90% and 100% of hero
        const fadeProgress = (scrollProgressInHero - fadeOutStart) / (fadeOutEnd - fadeOutStart)
        scrollFadeOut = 1 - fadeProgress
      } else {
        // Past hero section - check if we should fade in from behind section 2
        const section2Bottom = section2Top + section2Height
        
        // Calculate how much of section 2 is visible in viewport
        const viewportTop = scrollY
        const viewportBottom = scrollY + window.innerHeight
        
        // Stars start appearing when section 2 is 10% visible (90% still above viewport)
        // Stars fully visible when section 2 is 90% visible (10% still above viewport)
        const section2VisibleTop = Math.max(viewportTop, section2Top)
        const section2VisibleBottom = Math.min(viewportBottom, section2Bottom)
        const section2VisibleHeight = Math.max(0, section2VisibleBottom - section2VisibleTop)
        const section2Visibility = section2VisibleHeight / section2Height
        
        if (section2Visibility < 0.1) {
          // Section 2 less than 10% visible - stars hidden
          scrollFadeOut = 0
        } else if (section2Visibility >= 0.1 && section2Visibility < 0.9) {
          // Section 2 between 10% and 90% visible - fade in stars
          const fadeProgress = (section2Visibility - 0.1) / 0.8 // Normalize to 0-1
          scrollFadeOut = fadeProgress
        } else {
          // Section 2 is 90%+ visible - stars fully visible
          scrollFadeOut = 1
        }
      }
      
      // Draw stars - simplified calculations
      starsRef.current.forEach((star) => {
        const time = timeRef.current * star.speed
        const scrollUpOffset = scrollY * star.scrollUpSpeed
        
        // Simplified movement - less calculations
        const moveX = Math.sin(time + star.baseX * 0.003) * 0.3
        const moveY = Math.cos(time + star.baseY * 0.003) * 0.3
        const twinkle = Math.sin(time * star.twinkleSpeed + star.baseX) * 0.15 + 0.85
        
        let finalX, finalY, starOpacity
        
        if (star.comesFromBehind) {
          // Stars coming from behind section 2 (40% of stars)
          // Calculate how much of section 2 is visible
          const viewportTop = scrollY
          const viewportBottom = scrollY + window.innerHeight
          const section2VisibleTop = Math.max(viewportTop, section2Top)
          const section2VisibleBottom = Math.min(viewportBottom, section2Top + section2Height)
          const section2VisibleHeight = Math.max(0, section2VisibleBottom - section2VisibleTop)
          const section2Visibility = section2VisibleHeight / section2Height
          
          // Stars start appearing when section 2 is 10% visible
          if (section2Visibility >= 0.1) {
            // Calculate upward movement - stars come from behind section 2 and move up
            const section2Bottom = section2Top + section2Height
            const scrollProgress = Math.max(0, (scrollY - section2Top) / (section2Height * 2))
            
            // Stars start from bottom of section 2 and move upward
            const startFromBottom = section2Bottom
            const upwardOffset = scrollProgress * window.innerHeight * 0.8 // Move up as you scroll
            const baseY = startFromBottom - upwardOffset
            
            // Convert to canvas coordinates (0-100%)
            const yPercent = ((baseY - scrollY) / window.innerHeight) * 100
            
            // Wrap around if needed
            let finalYPercent = yPercent
            if (finalYPercent < 0) finalYPercent = 100 + finalYPercent
            if (finalYPercent > 100) finalYPercent = finalYPercent - 100
            
            finalY = (finalYPercent / 100) * canvas.height
            finalX = ((star.x + moveX) % 100) * canvas.width / 100
            
            // Fade in as section 2 becomes visible
            const fadeInProgress = Math.min(1, (section2Visibility - 0.1) / 0.5) // Fade in from 10% to 60% visibility
            starOpacity = star.opacity * fadeInProgress * twinkle
          } else {
            // Not visible yet - hide these stars
            finalX = -1000 // Off screen
            finalY = -1000
            starOpacity = 0
          }
        } else {
          // Regular stars (60%) - normal behavior
          finalX = ((star.x + moveX) % 100) * canvas.width / 100
          finalY = ((star.y + moveY - scrollUpOffset) % 100) * canvas.height / 100
          starOpacity = star.opacity * scrollFadeOut * twinkle
        }
        
        const finalOpacity = starOpacity
        
        // Draw star - optimized rendering for better performance
        if (finalOpacity > 0.05) { // Only skip very transparent stars
          // Simplified rendering - single draw for better performance
          ctx.globalAlpha = finalOpacity
          ctx.fillStyle = star.color
          // Use smaller shadow blur for better performance
          ctx.shadowBlur = star.size * 2
          ctx.shadowColor = star.color
          ctx.fillRect(finalX - star.size/2, finalY - star.size/2, star.size, star.size)
          
          // Draw bright center core
          ctx.globalAlpha = Math.min(finalOpacity * 1.1, 1)
          ctx.shadowBlur = 0
          ctx.fillStyle = '#FFFFFF'
          const coreSize = star.size * 0.5
          ctx.fillRect(finalX - coreSize/2, finalY - coreSize/2, coreSize, coreSize)
          
          ctx.shadowBlur = 0 // Reset shadow
        }
      })
      
      ctx.globalAlpha = 1
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animationFrameRef.current = requestAnimationFrame(animate)
    
    return () => {
      window.removeEventListener('resize', resize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 2,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        willChange: 'contents',
      }}
    />
  )
}

export default memo(HeroStars)
