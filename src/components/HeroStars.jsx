import React, { useRef, useEffect, memo } from 'react'

function HeroStars() {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const starsRef = useRef([])
  const scrollYRef = useRef(0)
  const timeRef = useRef(0)

  // Generate stars once - visible night sky stars
  useEffect(() => {
    const stars = []
    // Many more stars with much better visibility and prominence
    const starTypes = [
      { count: 60, sizeRange: [1.5, 2.5], opacityRange: [0.85, 1], color: '#FFFFFF', speedRange: [0.01, 0.02] },
      { count: 80, sizeRange: [1.2, 2], opacityRange: [0.75, 0.95], color: '#FFFFFF', speedRange: [0.02, 0.03] },
      { count: 100, sizeRange: [1, 1.8], opacityRange: [0.7, 0.9], color: '#FFFFFF', speedRange: [0.015, 0.025] },
      { count: 120, sizeRange: [0.8, 1.5], opacityRange: [0.65, 0.85], color: '#FFFFFF', speedRange: [0.02, 0.03] },
      { count: 90, sizeRange: [0.6, 1.2], opacityRange: [0.6, 0.8], color: '#E8E8E8', speedRange: [0.015, 0.025] },
      { count: 70, sizeRange: [0.5, 1], opacityRange: [0.55, 0.75], color: '#F0F0F0', speedRange: [0.02, 0.03] },
    ]
    
    starTypes.forEach((type, typeIndex) => {
      for (let i = 0; i < type.count; i++) {
        const size = Math.random() * (type.sizeRange[1] - type.sizeRange[0]) + type.sizeRange[0]
        const opacity = Math.random() * (type.opacityRange[1] - type.opacityRange[0]) + type.opacityRange[0]
        const speed = Math.random() * (type.speedRange[1] - type.speedRange[0]) + type.speedRange[0]
        
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
        })
      }
    })
    
    starsRef.current = stars
  }, [])

  // Handle scroll - store in ref, no re-renders
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
    const targetFPS = 30 // Reduced to 30fps for better performance
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
      
      // Get actual hero section height (could be more than 100vh due to content)
      const heroSection = document.getElementById('top')
      const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight
      
      // Get section 2 (ProofTrustBar) position
      const section2 = document.querySelector('.section-bg-1')
      const section2Top = section2 ? section2.getBoundingClientRect().top + scrollY : heroHeight * 2
      const section2Height = section2 ? section2.offsetHeight : window.innerHeight
      
      // Fade out at 90% of hero section scroll
      const fadeOutStart = heroHeight * 0.90
      const fadeOutEnd = heroHeight * 1.0
      
      // Calculate fade out opacity (0 to 1, where 1 is fully visible)
      let scrollFadeOut = 1
      if (scrollY < fadeOutStart) {
        // Before fade out starts - fully visible
        scrollFadeOut = 1
      } else if (scrollY >= fadeOutStart && scrollY < fadeOutEnd) {
        // Fading out between 90% and 100% of hero
        scrollFadeOut = 1 - ((scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart))
      } else {
        // Past hero section - check if we should fade in from behind section 2
        const section2Bottom = section2Top + section2Height
        const viewportBottom = scrollY + window.innerHeight
        
        // Fade in stars when section 2 is 90% visible (10% of section 2 is above viewport)
        const fadeInStart = section2Top + (section2Height * 0.1)
        const fadeInEnd = section2Bottom - (section2Height * 0.1)
        
        if (scrollY >= fadeInStart && scrollY < fadeInEnd) {
          // Fading in as section 2 becomes visible
          const fadeProgress = (scrollY - fadeInStart) / (fadeInEnd - fadeInStart)
          scrollFadeOut = Math.min(fadeProgress, 1)
        } else if (scrollY >= fadeInEnd) {
          // Section 2 is fully visible - stars fully visible
          scrollFadeOut = 1
        } else {
          // Between hero end and section 2 fade in - stars hidden
          scrollFadeOut = 0
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
        
        const finalX = ((star.x + moveX) % 100) * canvas.width / 100
        const finalY = ((star.y + moveY - scrollUpOffset) % 100) * canvas.height / 100
        const finalOpacity = star.opacity * scrollFadeOut * twinkle
        
        // Draw star - make much more prominent and visible
        if (finalOpacity > 0.05) { // Only skip very transparent stars
          // Draw glow effect first (larger, more transparent)
          ctx.globalAlpha = finalOpacity * 0.4
          ctx.fillStyle = star.color
          ctx.shadowBlur = star.size * 4
          ctx.shadowColor = star.color
          const glowSize = star.size * 2.5
          ctx.fillRect(finalX - glowSize/2, finalY - glowSize/2, glowSize, glowSize)
          
          // Draw main star (brighter, more prominent)
          ctx.globalAlpha = finalOpacity
          ctx.shadowBlur = star.size * 3
          ctx.shadowColor = star.color
          ctx.fillRect(finalX - star.size/2, finalY - star.size/2, star.size, star.size)
          
          // Draw bright center core for extra prominence
          ctx.globalAlpha = Math.min(finalOpacity * 1.2, 1)
          ctx.shadowBlur = 0
          ctx.fillStyle = '#FFFFFF'
          const coreSize = star.size * 0.6
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
