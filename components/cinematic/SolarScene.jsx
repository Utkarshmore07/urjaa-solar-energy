'use client'
import { useEffect, Suspense } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import Sun from './Sun'
import House from './House'
import SolarPanels from './SolarPanels'
import EnergyFlow from './EnergyFlow'
import CinematicCamera from './CinematicCamera'

function SceneRoot({ quality, reducedMotion, onReady }) {
  const { scene } = useThree()

  useEffect(() => {
    scene.background = new THREE.Color('#ebf7ff')
    scene.fog = new THREE.FogExp2('#edf8ff', 0.008)
    onReady?.()
  }, [scene, onReady])

  return (
    <>
      <CinematicCamera reducedMotion={reducedMotion} />

      <ambientLight intensity={0.7} color="#fff1ba" />
      <hemisphereLight skyColor="#dfefff" groundColor="#d1e6c8" intensity={0.95} />

      <Sun position={[-8, 10, -12]} />
      <House position={[0, 0, 0]} />
      <SolarPanels position={[0, 2.74, -0.5]} />
      <EnergyFlow active={!reducedMotion} />

      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#dfead2" roughness={0.9} />
      </mesh>

      <Stars
        radius={100}
        depth={20}
        count={quality === 'high' ? 500 : 180}
        factor={1.2}
        saturation={0.15}
        fade
      />

      {quality !== 'low' && (
        <EffectComposer>
          <Bloom
            intensity={0.25}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.85}
          />
          <Vignette eskil={false} offset={0.12} darkness={0.18} />
        </EffectComposer>
      )}
    </>
  )
}

export default function SolarScene({ quality = 'medium', reducedMotion = false, onReady }) {
  return (
    <Canvas
      camera={{ fov: 45, near: 0.1, far: 600, position: [14, 6, 16] }}
      gl={{
        antialias: quality === 'high',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
        powerPreference: 'high-performance',
      }}
      shadows={quality === 'high'}
      dpr={[1, quality === 'high' ? 2 : 1.25]}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <Suspense fallback={null}>
        <SceneRoot quality={quality} reducedMotion={reducedMotion} onReady={onReady} />
      </Suspense>
    </Canvas>
  )
}
