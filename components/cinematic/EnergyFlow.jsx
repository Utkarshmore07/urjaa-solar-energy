'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 55

// Energy path: panel → cable run → inverter → house electrical entry
const PATH_POINTS = [
  new THREE.Vector3(0.4,  3.2, -1.5),   // panel surface
  new THREE.Vector3(0.3,  2.85, -0.8),  // panel edge / cable exit
  new THREE.Vector3(0.0,  2.4,  0.2),   // cable run down roof edge
  new THREE.Vector3(-0.8, 1.9,  0.8),   // wall surface
  new THREE.Vector3(-1.8, 1.2,  0.6),   // inverter entry
  new THREE.Vector3(-1.8, 0.8,  0.6),   // inverter output
  new THREE.Vector3(-2.0, 0.4,  0.5),   // wall penetration
]

export default function EnergyFlow({ active = true }) {
  const pointsRef = useRef()
  const progressRef = useRef(
    Float32Array.from({ length: PARTICLE_COUNT }, (_, i) => i / PARTICLE_COUNT)
  )

  const { curve, positions } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(PATH_POINTS, false, 'catmullrom', 0.5)
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    // Pre-populate at start of curve
    const start = curve.getPointAt(0)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = start.x
      positions[i * 3 + 1] = start.y
      positions[i * 3 + 2] = start.z
    }
    return { curve, positions }
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current || !active) return
    const pos = pointsRef.current.geometry.attributes.position.array
    const prog = progressRef.current
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      prog[i] = (prog[i] + delta * 0.14) % 1
      const pt = curve.getPointAt(prog[i])
      pos[i * 3]     = pt.x
      pos[i * 3 + 1] = pt.y
      pos[i * 3 + 2] = pt.z
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#fbbf24"
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
