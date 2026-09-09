'use client'
import { useMemo } from 'react'
import * as THREE from 'three'

function buildPanelTexture() {
  if (typeof document === 'undefined') return null
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 768
  const ctx = canvas.getContext('2d')

  // PV cell dark blue base
  ctx.fillStyle = '#0a1628'
  ctx.fillRect(0, 0, 512, 768)

  // Silver aluminum frame border
  ctx.strokeStyle = 'rgba(180, 192, 204, 0.85)'
  ctx.lineWidth = 18
  ctx.strokeRect(9, 9, 494, 750)

  // Cell grid lines (6 cols × 9 rows)
  const cols = 6, rows = 9
  const cw = (512 - 18) / cols
  const rh = (768 - 18) / rows
  const ox = 9, oy = 9

  ctx.strokeStyle = 'rgba(80, 120, 180, 0.28)'
  ctx.lineWidth = 1.5
  for (let c = 0; c <= cols; c++) {
    ctx.beginPath(); ctx.moveTo(ox + c * cw, oy); ctx.lineTo(ox + c * cw, oy + rows * rh); ctx.stroke()
  }
  for (let r = 0; r <= rows; r++) {
    ctx.beginPath(); ctx.moveTo(ox, oy + r * rh); ctx.lineTo(ox + cols * cw, oy + r * rh); ctx.stroke()
  }

  // Busbar lines (vertical stripes in each cell)
  ctx.strokeStyle = 'rgba(160, 190, 220, 0.12)'
  ctx.lineWidth = 0.8
  for (let c = 0; c < cols; c++) {
    const cx = ox + c * cw + cw / 2
    ctx.beginPath(); ctx.moveTo(cx, oy); ctx.lineTo(cx, oy + rows * rh); ctx.stroke()
    const cx1 = ox + c * cw + cw * 0.25
    const cx2 = ox + c * cw + cw * 0.75
    ctx.beginPath(); ctx.moveTo(cx1, oy); ctx.lineTo(cx1, oy + rows * rh); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(cx2, oy); ctx.lineTo(cx2, oy + rows * rh); ctx.stroke()
  }

  // Slight shimmer on alternating cells
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      if ((c + r) % 2 === 0) {
        ctx.fillStyle = 'rgba(30, 65, 140, 0.1)'
        ctx.fillRect(ox + c * cw + 2, oy + r * rh + 2, cw - 4, rh - 4)
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas)
  return tex
}

const PANEL_TILT_X = -Math.PI / 8  // 22.5° tilt toward sun
const PW = 0.88, PH = 1.35, PD = 0.04

const LAYOUT = [
  [-0.58, -1.15], [0.58, -1.15],
  [-0.58,  0.0 ], [0.58,  0.0 ],
  [-0.58,  1.15], [0.58,  1.15],
]

export default function SolarPanels({ position = [0, 2.74, -0.5] }) {
  const panelTex = useMemo(() => buildPanelTexture(), [])
  const panelMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: panelTex,
    color: '#182848',
    roughness: 0.06,
    metalness: 0.1,
    reflectivity: 0.85,
    clearcoat: 0.7,
    clearcoatRoughness: 0.06,
    emissive: '#0a1020',
    emissiveIntensity: 0.04,
  }), [panelTex])

  return (
    <group position={position} rotation={[PANEL_TILT_X, 0, 0]}>
      {/* Mounting rail */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[1.9, 0.04, 3.6]} />
        <meshStandardMaterial color="#7a8a94" roughness={0.4} metalness={0.75} />
      </mesh>

      {/* 6 panels in 2×3 grid */}
      {LAYOUT.map(([px, pz], i) => (
        <mesh key={i} castShadow receiveShadow position={[px, 0.06, pz]} material={panelMat}>
          <boxGeometry args={[PW, PD, PH]} />
        </mesh>
      ))}

      {/* DC output cable stub */}
      <mesh position={[0, 0.08, 1.95]}>
        <cylinderGeometry args={[0.012, 0.012, 0.3, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
    </group>
  )
}
