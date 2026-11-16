'use client'
import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'

const LOOK_TARGET = new THREE.Vector3(0, 1.5, 0)
const START = { x: 14, y: 6, z: 16 }
const END   = { x: 8,  y: 4, z: 10 }

export default function CinematicCamera({ reducedMotion = false }) {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  const animDoneRef = useRef(false)

  useEffect(() => {
    camera.position.set(START.x, START.y, START.z)
    camera.lookAt(LOOK_TARGET)

    if (reducedMotion) {
      camera.position.set(END.x, END.y, END.z)
      animDoneRef.current = true
      return
    }

    const tween = gsap.to(camera.position, {
      x: END.x, y: END.y, z: END.z,
      duration: 3.8,
      ease: 'power2.inOut',
      delay: 0.3,
      onUpdate: () => camera.lookAt(LOOK_TARGET),
      onComplete: () => { animDoneRef.current = true },
    })

    return () => tween.kill()
  }, [camera, reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    const onMouse = (e) => {
      mouseRef.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => window.removeEventListener('mousemove', onMouse)
  }, [reducedMotion])

  useFrame(() => {
    if (reducedMotion || !animDoneRef.current) return
    // Subtle parallax — ±0.5 units max
    const tx = END.x + mouseRef.current.x * 0.5
    const ty = END.y + mouseRef.current.y * 0.3
    camera.position.x += (tx - camera.position.x) * 0.025
    camera.position.y += (ty - camera.position.y) * 0.025
    camera.lookAt(LOOK_TARGET)
  })

  return null
}
