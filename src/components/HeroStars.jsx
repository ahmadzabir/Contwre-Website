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
    // Increased star count and size for more prominent visual effect
    const starTypes = [
      { count: 80, sizeRange: [2.5, 4], opacityRange: [0.85, 1], color: '#FFFFFF', speedRange: [0.01, 0.02] },
      { count: 100, sizeRange: [2, 3.5], opacityRange: [0.75, 0.95], color: '#FFFFFF', speedRange: [0.02, 0.03] },
      { count: 120, sizeRange: [1.8, 3], opacityRange: [0.7, 0.9], color: '#FFFFFF', speedRange: [0.015, 0.025] },
      { count: 140, sizeRange: [1.5, 2.5], opacityRange: [0.65, 0.85], color: '#FFFFFF', speedRange: [0.02, 0.03] },
      { count: 100, sizeRange: [1.2, 2], opacityRange: [0.6, 0.8], color: '#E8E8E8', speedRange: [0.015, 0.025] },
      { count: 80, sizeRange: [1, 1.8], opacityRange: [0.55, 0.75], color: '#F0F0F0', speedRange: [0.02, 0.03] },
    ]
    
    starTypes.forEach((type, typeIndex) => {
      for (let i = 0; i < type.count; i++) {
        const size = Math.random() * (type.sizeRange[1] - type.sizeRange[0]) + type.sizeRange[0]
        const opacity = Math.random() * (type.opacityRange[1] - type.opacityRange[0]) + type.opacityRange[0]
        const speed = Math.random() * (type.speedRange[1] - type.speedRange[0]) + type.speedRange[0]
        
        // Mark 50% of stars to come from behind section 2 - ensure good distribution
        const comesFromBehind = Math.random() < 0.5
        // Mark 10% of stars to flicker like real stars
        const flickers = Math.random() < 0.1
        
        stars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: size,
          speed: speed,
          opacity: opacity,
          baseX: Math.random() * 100,
          baseY: Math.random() * 100,
          scrollUpSpeed: Math.random() * 0.15 + 0.18, // Slightly faster base speed
          driftSpeed: Math.random() * 0.008 + 0.002,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          color: type.color,
          type: typeIndex,
          comesFromBehind: comesFromBehind, // Mark stars that come from behind section 2
          flickers: flickers, // Mark stars that flicker like real stars
          flickerSpeed: flickers ? Math.random() * 0.02 + 0.01 : 0, // Random flicker speed for each star
          flickerPhase: flickers ? Math.random() * Math.PI * 2 : 0, // Random phase offset for natural flickering
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
    
    // Find the first section-bg-1 which contains ProofTrustBar (section 2)
    const allSections = document.querySelectorAll('.section-bg-1')
    const section2 = allSections[0] // First section-bg-1 is the proof bar
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
    const targetFPS = 30 // Increased to 30fps for smoother star movement
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
        
        // Regular twinkle effect
        const twinkle = Math.sin(time * star.twinkleSpeed + star.baseX) * 0.15 + 0.85
        
        // Flickering effect for 10% of stars (realistic star flicker)
        let flickerMultiplier = 1
        if (star.flickers) {
          // Create realistic flickering using multiple sine waves with different frequencies
          const flicker1 = Math.sin(time * star.flickerSpeed * 3 + star.flickerPhase) * 0.3 + 0.7
          const flicker2 = Math.sin(time * star.flickerSpeed * 7 + star.flickerPhase * 1.5) * 0.2 + 0.8
          const flicker3 = Math.sin(time * star.flickerSpeed * 13 + star.flickerPhase * 2) * 0.15 + 0.85
          // Combine flickers for natural randomness
          flickerMultiplier = (flicker1 * 0.4 + flicker2 * 0.35 + flicker3 * 0.25)
          // Add occasional dramatic flickers (like real stars)
          const dramaticFlicker = Math.random() < 0.02 ? (Math.random() * 0.4 + 0.3) : 1
          flickerMultiplier *= dramaticFlicker
        }
        
        let finalX, finalY, starOpacity
        
        if (star.comesFromBehind) {
          // Stars coming from behind section 2 (50% of stars)
          // These stars should appear when section 2 becomes visible and move upward
          
          const section2Bottom = section2Top + section2Height
          const viewportTop = scrollY
          const viewportBottom = scrollY + window.innerHeight
          
          // Stars should appear as soon as section 2 starts becoming visible
          // Check if section 2 is at least partially visible in viewport
          const section2VisibleTop = Math.max(viewportTop, section2Top)
          const section2VisibleBottom = Math.min(viewportBottom, section2Bottom)
          const section2VisibleHeight = Math.max(0, section2VisibleBottom - section2VisibleTop)
          
          // Stars appear when section 2 is at least 5% visible
          if (section2VisibleHeight > section2Height * 0.05) {
            // Calculate how much we've scrolled past section 2's top
            const scrollPastSection2Top = Math.max(0, scrollY - section2Top)
            
            // Each star has a unique starting Y position based on baseY
            // Stars are distributed across the height of section 2, starting from the bottom
            const starOffsetInSection = (star.baseY / 100) * section2Height
            
            // Stars start at the bottom of section 2, offset by their unique position
            // They appear to be "behind" section 2, so they start from section 2's bottom
            const starStartY = section2Bottom - starOffsetInSection
            
            // As we scroll, stars move upward through section 2
            // The movement is proportional to how much we've scrolled
            // Stars move upward much faster and smoother - using 1.8x scroll distance
            // Apply smooth easing for more natural, fluid motion
            const scrollProgress = Math.min(1, scrollPastSection2Top / (section2Height * 1.2))
            // Smooth ease-in-out curve for fluid movement
            const easedProgress = scrollProgress < 0.5 
              ? 2 * scrollProgress * scrollProgress 
              : 1 - Math.pow(-2 * scrollProgress + 2, 3) / 2 // Smoother cubic easing
            // Faster movement with smooth acceleration - 1.8x base speed
            const upwardMovement = scrollPastSection2Top * 1.8 * (0.9 + easedProgress * 0.2)
            const currentStarY = starStartY - upwardMovement
            
            // Convert to viewport-relative coordinates
            const viewportRelativeY = currentStarY - scrollY
            
            // Only show stars that are in or near the viewport
            if (viewportRelativeY >= -100 && viewportRelativeY <= window.innerHeight + 100) {
              // Convert to canvas coordinates
              finalY = Math.max(-50, Math.min(canvas.height + 50, viewportRelativeY + 50))
              finalX = ((star.x + moveX) % 100) * canvas.width / 100
              
              // Calculate section 2 visibility for fade-in effect
              const section2Visibility = section2VisibleHeight / section2Height
              
              // Fade in from 5% to 40% visibility of section 2
              let fadeIn = 0
              if (section2Visibility >= 0.05) {
                fadeIn = Math.min(1, (section2Visibility - 0.05) / 0.35) // Fade from 5% to 40%
              }
              
              // Fade out as stars reach top of viewport
              const viewportPosition = viewportRelativeY / window.innerHeight
              let fadeOut = 1
              if (viewportPosition < 0.2) {
                // Fade out in top 20% of viewport
                fadeOut = Math.max(0, viewportPosition / 0.2)
              }
              
              // Stars should be visible and move upward
              starOpacity = star.opacity * fadeIn * fadeOut * twinkle * flickerMultiplier
            } else {
              // Star is outside viewport
              finalX = -1000
              finalY = -1000
              starOpacity = 0
            }
          } else {
            // Section 2 not visible enough - hide stars
            finalX = -1000
            finalY = -1000
            starOpacity = 0
          }
        } else {
          // Regular stars (50%) - normal behavior
          finalX = ((star.x + moveX) % 100) * canvas.width / 100
          finalY = ((star.y + moveY - scrollUpOffset) % 100) * canvas.height / 100
          starOpacity = star.opacity * scrollFadeOut * twinkle * flickerMultiplier
        }
        
        const finalOpacity = starOpacity
        
        // Draw star - optimized rendering for better performance
        if (finalOpacity > 0.05) { // Only skip very transparent stars
          // Enhanced rendering with larger stars and better glow
          ctx.globalAlpha = finalOpacity
          ctx.fillStyle = star.color
          // Increased shadow blur for more prominent stars
          ctx.shadowBlur = star.size * 3.5
          ctx.shadowColor = star.color
          
          // Draw star with glow
          ctx.beginPath()
          ctx.arc(finalX, finalY, star.size / 2, 0, Math.PI * 2)
          ctx.fill()
          
          // Draw bright center core for larger stars
          ctx.globalAlpha = Math.min(finalOpacity * 1.2, 1)
          ctx.shadowBlur = 0
          ctx.fillStyle = '#FFFFFF'
          const coreSize = star.size * 0.6
          ctx.beginPath()
          ctx.arc(finalX, finalY, coreSize / 2, 0, Math.PI * 2)
          ctx.fill()
          
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
        zIndex: 8, // Below section 2 (z-10) but visible when section 2 is visible
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
