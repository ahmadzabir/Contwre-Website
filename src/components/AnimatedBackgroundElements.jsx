import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Animated background elements for more visual interest
function AnimatedBackgroundElements() {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      
      // Rotate the entire group
      groupRef.current.rotation.y = time * 0.01
      groupRef.current.rotation.x = Math.sin(time * 0.05) * 0.1
      
      // Animate individual elements
      groupRef.current.children.forEach((child, index) => {
        if (child.userData.isAnimated) {
          child.position.y = Math.sin(time * 0.1 + index) * 2
          child.rotation.z = time * 0.02 * (index % 2 === 0 ? 1 : -1)
          child.scale.setScalar(1 + Math.sin(time * 0.08 + index) * 0.1)
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {/* Floating geometric shapes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20 - 10
          ]}
          userData={{ isAnimated: true }}
        >
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#5B9CFF' : i % 3 === 1 ? '#35E0B9' : '#F5E6C8'}
            transparent
            opacity={0.1}
          />
        </mesh>
      ))}
      
      {/* Floating rings */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={`ring-${i}`}
          position={[
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15 - 8
          ]}
          userData={{ isAnimated: true }}
        >
          <torusGeometry args={[1, 0.1, 8, 16]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#5B9CFF' : '#35E0B9'}
            transparent
            opacity={0.08}
          />
        </mesh>
      ))}
      
      {/* Floating spheres */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={`sphere-${i}`}
          position={[
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 25 - 12
          ]}
          userData={{ isAnimated: true }}
        >
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshBasicMaterial
            color={i % 4 === 0 ? '#5B9CFF' : i % 4 === 1 ? '#35E0B9' : i % 4 === 2 ? '#F5E6C8' : '#FFFFFF'}
            transparent
            opacity={0.06}
          />
        </mesh>
      ))}
    </group>
  )
}

export default AnimatedBackgroundElements












