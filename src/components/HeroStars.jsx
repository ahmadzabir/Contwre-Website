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
    // More stars with better visibility
    const starTypes = [
      { count: 20, sizeRange: [1, 1.5], opacityRange: [0.7, 1], color: '#FFFFFF', speedRange: [0.01, 0.02] },
      { count: 30, sizeRange: [0.8, 1.2], opacityRange: [0.6, 0.9], color: '#FFFFFF', speedRange: [0.02, 0.03] },
      { count: 25, sizeRange: [0.6, 1], opacityRange: [0.5, 0.8], color: '#E0E0E0', speedRange: [0.015, 0.025] },
      { count: 15, sizeRange: [0.5, 0.8], opacityRange: [0.4, 0.7], color: '#FFFFFF', speedRange: [0.02, 0.03] },
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
      // Calculate hero section height (min-h-screen = 100vh)
      const heroHeight = window.innerHeight
      // Fade out at 80-90% of hero section (use 85% as middle point)
      const fadeStartPoint = heroHeight * 0.85
      const scrollFadeOut = Math.max(0, 1 - scrollY / fadeStartPoint)
      
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
        
        // Draw star - make more visible
        if (finalOpacity > 0.05) { // Only skip very transparent stars
          ctx.globalAlpha = finalOpacity
          ctx.fillStyle = star.color
          // Draw a small glow effect for better visibility
          ctx.shadowBlur = star.size * 2
          ctx.shadowColor = star.color
          ctx.fillRect(finalX - star.size/2, finalY - star.size/2, star.size, star.size)
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
