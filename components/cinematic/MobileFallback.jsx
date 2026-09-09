'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function MobileFallback() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let rafId, lastT = 0, W = 0, H = 0
    const STARS = [], PTCL = []

    function resize() {
      W = canvas.width = canvas.offsetWidth || canvas.parentElement?.offsetWidth || window.innerWidth
      H = canvas.height = canvas.offsetHeight || canvas.parentElement?.offsetHeight || window.innerHeight
      buildStars()
    }

    function buildStars() {
      STARS.length = 0
      const n = Math.min(Math.floor(W * H / 2800), 200)
      for (let i = 0; i < n; i++) {
        STARS.push({
          x: Math.random() * W, y: Math.random() * H * 0.64,
          r: Math.random() * 1.4 + 0.2,
          phase: Math.random() * Math.PI * 2,
          freq: 0.25 + Math.random() * 0.85,
          a: 0.18 + Math.random() * 0.62,
        })
      }
    }

    function buildParticles() {
      PTCL.length = 0
      for (let i = 0; i < 36; i++) {
        PTCL.push({ t: Math.random(), speed: 0.0025 + Math.random() * 0.0035, sz: 1.5 + Math.random() * 2.5 })
      }
    }

    const SUN  = () => ({ x: W * 0.17, y: H * 0.16, r: Math.min(W, H) * 0.1 })
    const HC   = () => ({ x: W * 0.56, y: H * 0.73 })
    const HS   = () => ({ w: Math.min(W * 0.24, 210), h: Math.min(H * 0.25, 175) })

    function bez(t, p0, p1, p2, p3) {
      const u = 1 - t
      return {
        x: u**3*p0.x + 3*u**2*t*p1.x + 3*u*t**2*p2.x + t**3*p3.x,
        y: u**3*p0.y + 3*u**2*t*p1.y + 3*u*t**2*p2.y + t**3*p3.y,
      }
    }

    function dBg() {
      const g = ctx.createRadialGradient(W * 0.2, H * 0.15, 0, W * 0.5, H * 0.5, Math.max(W, H))
      g.addColorStop(0, '#0d1f3c'); g.addColorStop(0.32, '#071526')
      g.addColorStop(0.7, '#050e1f'); g.addColorStop(1, '#020812')
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
    }

    function dStars(t) {
      for (const s of STARS) {
        const a = s.a * (0.55 + 0.45 * Math.sin(t * s.freq + s.phase))
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(210,228,255,${a})`; ctx.fill()
      }
    }

    function dSun(t) {
      const s = SUN()
      const hz = ctx.createRadialGradient(s.x, s.y, s.r, s.x, s.y, s.r * 7)
      hz.addColorStop(0, 'rgba(255,148,18,0.22)'); hz.addColorStop(0.3, 'rgba(255,100,10,0.09)')
      hz.addColorStop(0.7, 'rgba(240,60,0,0.03)'); hz.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = hz; ctx.fillRect(0, 0, W * 0.6, H * 0.58)

      for (let i = 0; i < 14; i++) {
        const angle = (i / 14) * Math.PI * 2 + t * 0.032
        const len = s.r * (3 + 0.4 * Math.sin(t * 1.1 + i))
        const a = 0.045 + 0.018 * Math.sin(t * 0.7 + i * 1.4)
        ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(angle)
        const rg = ctx.createLinearGradient(s.r, 0, s.r + len, 0)
        rg.addColorStop(0, `rgba(255,200,52,${a})`); rg.addColorStop(1, 'rgba(255,200,52,0)')
        ctx.beginPath(); ctx.moveTo(s.r, -2.5); ctx.lineTo(s.r + len, 0); ctx.lineTo(s.r, 2.5)
        ctx.fillStyle = rg; ctx.fill(); ctx.restore()
      }

      for (let i = 4; i >= 1; i--) {
        const a = (0.06 - i * 0.012) * (1 + 0.12 * Math.sin(t * 0.55 + i))
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * (1.22 + i * 0.44), 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255,178,36,${a})`; ctx.lineWidth = 2.2; ctx.stroke()
      }

      const disc = ctx.createRadialGradient(s.x - s.r * 0.28, s.y - s.r * 0.3, 0, s.x, s.y, s.r)
      disc.addColorStop(0, '#fffce0'); disc.addColorStop(0.24, '#ffdd55')
      disc.addColorStop(0.6, '#ffaa22'); disc.addColorStop(0.88, '#ff8800'); disc.addColorStop(1, '#ff5500')
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = disc; ctx.fill()

      const sp = ctx.createRadialGradient(s.x - s.r * 0.3, s.y - s.r * 0.3, 0, s.x - s.r * 0.18, s.y - s.r * 0.18, s.r * 0.55)
      sp.addColorStop(0, 'rgba(255,255,235,0.52)'); sp.addColorStop(1, 'rgba(255,255,235,0)')
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = sp; ctx.fill()
    }

    function dTerrain() {
      ctx.fillStyle = '#040d1a'
      ctx.beginPath()
      ctx.moveTo(0, H * 0.81); ctx.lineTo(W * 0.1, H * 0.73); ctx.lineTo(W * 0.27, H * 0.77)
      ctx.lineTo(W * 0.42, H * 0.71); ctx.lineTo(W * 0.73, H * 0.71)
      ctx.lineTo(W * 0.87, H * 0.68); ctx.lineTo(W, H * 0.74)
      ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath(); ctx.fill()
    }

    function dHouse(t) {
      const c = HC(), sz = HS()
      const x0 = c.x - sz.w / 2, y0 = c.y - sz.h
      ctx.fillStyle = '#0c1d30'; ctx.fillRect(x0, y0, sz.w, sz.h)
      ctx.fillStyle = 'rgba(0,0,0,0.28)'; ctx.fillRect(x0 + sz.w - 5, y0, 5, sz.h)
      ctx.fillStyle = '#07111e'; ctx.fillRect(x0 - 9, y0 - 12, sz.w + 18, 14)

      const wA = 0.56 + 0.11 * Math.sin(t * 0.85)
      const wY = y0 + sz.h * 0.34, wH = sz.h * 0.28, wW = sz.w * 0.22
      for (let i = 0; i < 2; i++) {
        const wX = x0 + sz.w * (i === 0 ? 0.13 : 0.57)
        const wg = ctx.createRadialGradient(wX + wW / 2, wY + wH / 2, 0, wX + wW / 2, wY + wH / 2, wW * 1.8)
        wg.addColorStop(0, `rgba(255,200,60,${wA * 0.22})`); wg.addColorStop(1, 'rgba(255,200,60,0)')
        ctx.fillStyle = wg; ctx.fillRect(wX - 14, wY - 14, wW + 28, wH + 28)
        ctx.fillStyle = `rgba(255,210,96,${wA})`; ctx.fillRect(wX, wY, wW, wH)
      }

      ctx.fillStyle = '#07111c'; ctx.fillRect(c.x - sz.w * 0.11, c.y - sz.h * 0.37, sz.w * 0.22, sz.h * 0.37)

      const ibX = x0 + sz.w * 0.78, ibY = y0 + sz.h * 0.52, ibW = sz.w * 0.14, ibH = sz.h * 0.2
      ctx.fillStyle = '#0a1825'; ctx.fillRect(ibX, ibY, ibW, ibH)
      ctx.strokeStyle = 'rgba(56,189,248,0.4)'; ctx.lineWidth = 1; ctx.strokeRect(ibX, ibY, ibW, ibH)
      const ila = 0.55 + 0.45 * Math.sin(t * 2.6)
      ctx.beginPath(); ctx.arc(ibX + ibW / 2, ibY + ibH * 0.42, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(56,189,248,${ila})`; ctx.fill()
      ctx.strokeStyle = 'rgba(50,110,170,0.15)'; ctx.lineWidth = 1; ctx.strokeRect(x0, y0, sz.w, sz.h)
    }

    function dPanels(t) {
      const c = HC(), sz = HS()
      const x0 = c.x - sz.w / 2, roofY = c.y - sz.h - 12
      const pW = (sz.w - 12) / 3, pH = sz.h * 0.3

      for (let i = 0; i < 3; i++) {
        const px = x0 + 6 + i * pW, py = roofY - pH
        ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.fillRect(px + 3, py + 3, pW - 4, pH)

        const pg = ctx.createLinearGradient(px, py, px + pW - 4, py + pH)
        pg.addColorStop(0, '#0c2248'); pg.addColorStop(0.48, '#143468'); pg.addColorStop(1, '#0c1e44')
        ctx.fillStyle = pg; ctx.fillRect(px, py, pW - 4, pH)

        const shimX = (Math.sin(t * 0.65 + i * 2.1) * 0.5 + 0.5) * (pW - 4)
        const sg = ctx.createLinearGradient(px + shimX - 20, py, px + shimX + 20, py)
        sg.addColorStop(0, 'rgba(180,215,255,0)'); sg.addColorStop(0.5, `rgba(180,215,255,${0.06 + 0.04 * Math.sin(t * 2 + i)})`); sg.addColorStop(1, 'rgba(180,215,255,0)')
        ctx.fillStyle = sg; ctx.fillRect(px, py, pW - 4, pH)

        ctx.strokeStyle = 'rgba(80,140,210,0.3)'; ctx.lineWidth = 0.6
        for (let r = 1; r < 4; r++) { ctx.beginPath(); ctx.moveTo(px, py + pH * r / 4); ctx.lineTo(px + pW - 4, py + pH * r / 4); ctx.stroke() }
        for (let col = 1; col < 3; col++) { ctx.beginPath(); ctx.moveTo(px + (pW - 4) * col / 3, py); ctx.lineTo(px + (pW - 4) * col / 3, py + pH); ctx.stroke() }

        ctx.strokeStyle = 'rgba(100,170,255,0.48)'; ctx.lineWidth = 1.2; ctx.strokeRect(px, py, pW - 4, pH)

        const la = 0.55 + 0.45 * Math.sin(t * 4 + i * 2.4)
        const lg = ctx.createRadialGradient(px + pW - 8, py + pH - 7, 0, px + pW - 8, py + pH - 7, 8)
        lg.addColorStop(0, `rgba(74,222,128,${la})`); lg.addColorStop(1, 'rgba(74,222,128,0)')
        ctx.fillStyle = lg; ctx.beginPath(); ctx.arc(px + pW - 8, py + pH - 7, 8, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.arc(px + pW - 8, py + pH - 7, 2.5, 0, Math.PI * 2); ctx.fillStyle = `rgba(74,222,128,${la})`; ctx.fill()
      }
    }

    function dEnergy(t) {
      const c = HC(), sz = HS()
      const p0 = { x: c.x, y: c.y - sz.h - 12 - sz.h * 0.14 }
      const p3 = { x: c.x + sz.w * 0.38, y: c.y - sz.h * 0.59 }
      const p1 = { x: p0.x + sz.w * 0.38, y: p0.y + (p3.y - p0.y) * 0.33 }
      const p2 = { x: p3.x - sz.w * 0.12, y: p0.y + (p3.y - p0.y) * 0.67 }

      ctx.beginPath(); ctx.moveTo(p0.x, p0.y); ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
      ctx.strokeStyle = 'rgba(56,189,248,0.08)'; ctx.lineWidth = 6; ctx.stroke()

      for (const p of PTCL) {
        p.t = (p.t + p.speed) % 1
        const pos = bez(p.t, p0, p1, p2, p3)
        const rC = Math.round(251 + (56 - 251) * p.t)
        const gC = Math.round(191 + (189 - 191) * p.t)
        const bC = Math.round(36  + (248 - 36)  * p.t)
        const gw = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, p.sz * 5)
        gw.addColorStop(0, `rgba(${rC},${gC},${bC},0.6)`); gw.addColorStop(1, `rgba(${rC},${gC},${bC},0)`)
        ctx.fillStyle = gw; ctx.beginPath(); ctx.arc(pos.x, pos.y, p.sz * 5, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.arc(pos.x, pos.y, p.sz, 0, Math.PI * 2); ctx.fillStyle = `rgba(${rC},${gC},${bC},0.95)`; ctx.fill()
      }

      const ga = 0.42 + 0.3 * Math.sin(t * 2.9)
      const gg = ctx.createRadialGradient(p3.x, p3.y, 0, p3.x, p3.y, 26)
      gg.addColorStop(0, `rgba(56,189,248,${ga})`); gg.addColorStop(1, 'rgba(56,189,248,0)')
      ctx.fillStyle = gg; ctx.fillRect(p3.x - 26, p3.y - 26, 52, 52)
    }

    function dVignette() {
      const v = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, Math.max(W, H) * 0.82)
      v.addColorStop(0, 'rgba(2,8,19,0)'); v.addColorStop(1, 'rgba(2,8,19,0.52)')
      ctx.fillStyle = v; ctx.fillRect(0, 0, W, H)
      const bf = ctx.createLinearGradient(0, H * 0.79, 0, H)
      bf.addColorStop(0, 'rgba(2,8,19,0)'); bf.addColorStop(1, 'rgba(2,8,19,0.95)')
      ctx.fillStyle = bf; ctx.fillRect(0, H * 0.79, W, H * 0.21)
    }

    function frame(now) {
      if (W === 0) resize()
      if (now - lastT > 14) {
        lastT = now
        const t = now * 0.001
        dBg(); dStars(t); dSun(t); dTerrain(); dHouse(t); dPanels(t); dEnergy(t); dVignette()
      }
      rafId = requestAnimationFrame(frame)
    }

    const handleResize = () => resize()
    window.addEventListener('resize', handleResize)
    resize()
    buildParticles()
    rafId = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', handleResize) }
  }, [])


  return (
    <div className="absolute inset-0 overflow-hidden bg-[#ebf8ff]" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
