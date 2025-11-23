import React, { useRef, useEffect, memo } from 'react'

function HeroStars() {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)
  const starsRef = useRef([])
  const scrollYRef = useRef(0)
  const timeRef = useRef(0)

  // Generate stars once
  useEffect(() => {
    const stars = []
    const starTypes = [
      { count: 8, sizeRange: [2, 4], opacityRange: [0.8, 1], color: '#FFFFFF', speedRange: [0.005, 0.01] },
      { count: 12, sizeRange: [1, 2], opacityRange: [0.6, 0.8], color: '#00FFFF', speedRange: [0.01, 0.02] },
      { count: 15, sizeRange: [0.5, 1], opacityRange: [0.4, 0.6], color: '#FFFFFF', speedRange: [0.02, 0.03] },
      { count: 10, sizeRange: [0.3, 0.6], opacityRange: [0.2, 0.4], color: '#87CEEB', speedRange: [0.03, 0.04] },
      { count: 5, sizeRange: [0.2, 0.4], opacityRange: [0.1, 0.3], color: '#FFFFFF', speedRange: [0.04, 0.05] },
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

    const animate = (currentTime) => {
      timeRef.current = currentTime / 5000
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const scrollY = scrollYRef.current
      const scrollFadeOut = Math.max(0, 1 - scrollY / 300)
      
      // Draw stars
      starsRef.current.forEach((star) => {
        const time = timeRef.current * star.speed
        const scrollUpOffset = scrollY * star.scrollUpSpeed
        
        // Calculate movement
        let moveX, moveY, driftX, driftY, twinkle
        
        switch (star.type) {
          case 0:
            moveX = Math.sin(time + star.baseX * 0.002) * 0.3
            moveY = Math.cos(time + star.baseY * 0.002) * 0.3
            driftX = Math.sin(time * star.driftSpeed + star.baseX * 0.005) * 0.2
            driftY = Math.cos(time * star.driftSpeed + star.baseY * 0.005) * 0.2
            twinkle = Math.sin(time * star.twinkleSpeed + star.baseX) * 0.1 + 0.9
            break
          case 1:
            moveX = Math.sin(time + star.baseX * 0.003) * 0.4
            moveY = Math.cos(time + star.baseY * 0.003) * 0.4
            driftX = Math.sin(time * star.driftSpeed + star.baseX * 0.006) * 0.25
            driftY = Math.cos(time * star.driftSpeed + star.baseY * 0.006) * 0.25
            twinkle = Math.sin(time * star.twinkleSpeed + star.baseX) * 0.15 + 0.85
            break
          case 2:
            moveX = Math.sin(time + star.baseX * 0.004) * 0.5
            moveY = Math.cos(time + star.baseY * 0.004) * 0.5
            driftX = Math.sin(time * star.driftSpeed + star.baseX * 0.007) * 0.3
            driftY = Math.cos(time * star.driftSpeed + star.baseY * 0.007) * 0.3
            twinkle = Math.sin(time * star.twinkleSpeed + star.baseX) * 0.2 + 0.8
            break
          case 3:
            moveX = Math.sin(time + star.baseX * 0.005) * 0.6
            moveY = Math.cos(time + star.baseY * 0.005) * 0.6
            driftX = Math.sin(time * star.driftSpeed + star.baseX * 0.008) * 0.35
            driftY = Math.cos(time * star.driftSpeed + star.baseY * 0.008) * 0.35
            twinkle = Math.sin(time * star.twinkleSpeed + star.baseX) * 0.25 + 0.75
            break
          default:
            moveX = Math.sin(time + star.baseX * 0.003) * 0.5
            moveY = Math.cos(time + star.baseY * 0.003) * 0.5
            driftX = Math.sin(time * star.driftSpeed + star.baseX * 0.008) * 0.3
            driftY = Math.cos(time * star.driftSpeed + star.baseY * 0.008) * 0.3
            twinkle = Math.sin(time * star.twinkleSpeed + star.baseX) * 0.2 + 0.8
        }
        
        const finalX = ((star.x + moveX + driftX) % 100) * canvas.width / 100
        const finalY = ((star.y + moveY + driftY - scrollUpOffset) % 100) * canvas.height / 100
        const finalOpacity = star.opacity * scrollFadeOut * twinkle
        
        // Draw star
        ctx.globalAlpha = finalOpacity
        ctx.fillStyle = star.color
        ctx.beginPath()
        ctx.arc(finalX, finalY, star.size, 0, Math.PI * 2)
        ctx.fill()
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
