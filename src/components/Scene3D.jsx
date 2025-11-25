import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, useScroll } from '@react-three/drei'
import EnergyFlowBackground from './EnergyFlowBackground'

// Simple scroll-responsive starfield
function ScrollStarField() {
  const group = useRef()
  const scroll = useScroll()
  
  useFrame((state, delta) => {
    if (group.current && delta < 0.1) { // Skip if frame time is too high
      const time = state.clock.elapsedTime
      const scrollOffset = scroll.offset
      
      // Scroll-based movement - optimized calculations
      group.current.position.z = scrollOffset * 15 - 20
      group.current.position.y = scrollOffset * 8 - 4
      group.current.position.x = Math.sin(scrollOffset * Math.PI) * 3
      
      // Gentle rotation - reduced frequency for better performance
      group.current.rotation.y = time * 0.008 + scrollOffset * 0.08
      group.current.rotation.x = Math.sin(time * 0.004) * 0.04 + scrollOffset * 0.02
    }
  })
  
  return (
    <group ref={group}>
      <Stars 
        radius={100} 
        depth={50} 
        count={1000} 
        factor={5} 
        saturation={0.5} 
        fade={false}
        speed={0.02} 
      />
    </group>
  )
}

// Simple floating particles
function FloatingParticles() {
  const group = useRef()
  const scroll = useScroll()
  
  useFrame((state, delta) => {
    if (group.current && delta < 0.1) { // Skip if frame time is too high
      const time = state.clock.elapsedTime
      const scrollOffset = scroll.offset
      
      // Scroll-based movement
      group.current.position.z = scrollOffset * 10 - 15
      group.current.position.y = scrollOffset * 5 - 2
      
      // Gentle floating motion - reduced frequency
      group.current.rotation.y = time * 0.012 + scrollOffset * 0.12
      group.current.rotation.x = Math.sin(time * 0.006) * 0.06 + scrollOffset * 0.04
    }
  })
  
  return (
    <group ref={group}>
      <Stars 
        radius={60} 
        depth={30} 
        count={400} 
        factor={3} 
        saturation={0.6} 
        fade={false}
        speed={0.03} 
      />
    </group>
  )
}

// Main Three.js scene with simple starfield
function Scene3D() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleInteraction = () => {
      setIsLoaded(true)
      document.removeEventListener('mousemove', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }

    document.addEventListener('mousemove', handleInteraction)
    document.addEventListener('touchstart', handleInteraction)

    return () => {
      document.removeEventListener('mousemove', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-0" style={{ width: '100vw', height: '100vh' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-bg via-bgSecondary to-bg" />
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/20" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-0" style={{ width: '100vw', height: '100vh' }}>
      {/* Subtle gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/20 to-bg/40 z-10 pointer-events-none" />
      
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ 
          width: '100%',
          height: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 0,
          background: 'transparent'
        }}
      >
        <Suspense fallback={null}>
          {/* Enhanced lighting setup */}
          <ambientLight intensity={0.15} />
          <directionalLight position={[10, 10, 5]} intensity={0.6} />
          <pointLight position={[0, 0, 8]} intensity={0.3} color="#5B9CFF" />
          <pointLight position={[0, 0, -5]} intensity={0.2} color="#35E0B9" />
          
          {/* Energy Flow Background */}
          <EnergyFlowBackground />
          
          {/* Scroll-responsive starfield */}
          <ScrollStarField />
          
          {/* Floating particles */}
          <FloatingParticles />
          
          {/* Additional background stars for depth */}
          <Stars 
            radius={1000} 
            depth={100} 
            count={600} 
            factor={4} 
            saturation={0.4} 
            fade={false}
            speed={0.05} 
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene3D