'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Sun({ position = [-8, 10, -12] }) {
  const sunRef = useRef()
  const corona1Ref = useRef()
  const corona2Ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (corona1Ref.current) {
      corona1Ref.current.material.opacity = 0.06 + Math.sin(t * 0.8) * 0.02
    }
    if (corona2Ref.current) {
      corona2Ref.current.material.opacity = 0.03 + Math.sin(t * 0.5 + 1) * 0.01
    }
  })

  return (
    <group position={position}>
      {/* Primary directional light — acts as the sun */}
      <directionalLight
        intensity={3.5}
        color="#fff8e0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={80}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      {/* Point light for warm local glow */}
      <pointLight intensity={1.8} color="#ffcc66" distance={70} decay={1.5} />

      {/* Sun disc */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial
          color="#ffaa22"
          emissive="#ff8800"
          emissiveIntensity={5}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Inner corona */}
      <mesh ref={corona1Ref}>
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial
          color="#ff9900"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Outer atmospheric glow */}
      <mesh ref={corona2Ref}>
        <sphereGeometry args={[4.5, 32, 32]} />
        <meshBasicMaterial
          color="#ffcc44"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Light rays — 6 thin flat planes rotated around sun */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i / 6) * Math.PI]}>
          <planeGeometry args={[0.06, 12]} />
          <meshBasicMaterial
            color="#ffdd88"
            transparent
            opacity={0.04}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
