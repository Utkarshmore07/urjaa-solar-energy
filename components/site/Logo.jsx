'use client'
import Link from 'next/link'

const NAVY = '#0f2447'
const GREEN = '#16a34a'
const YELLOW = '#f5b400'
const BLUE = '#1e3a8a'

export default function Logo({ light = false, className = '' }) {
  const textColor = light ? '#ffffff' : NAVY
  const sub = light ? '#86efac' : GREEN
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <svg width="40" height="40" viewBox="0 0 64 64" className="shrink-0">
        <g stroke={YELLOW} strokeWidth="2.5" strokeLinecap="round">
          {[...Array(9)].map((_, i) => {
            const a = (i * 20 - 80) * (Math.PI / 180)
            const x1 = 40 + Math.cos(a) * 10, y1 = 18 + Math.sin(a) * 10
            const x2 = 40 + Math.cos(a) * 15, y2 = 18 + Math.sin(a) * 15
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          })}
        </g>
        <circle cx="40" cy="18" r="6" fill={YELLOW} />
        <path d="M14 12 V38 a10 10 0 0 0 10 10" stroke={GREEN} strokeWidth="6" fill="none" strokeLinecap="round" />
        <g transform="translate(28 24) rotate(15)">
          <rect x="0" y="0" width="26" height="18" rx="1.5" fill={BLUE} />
          <g stroke="#3b82f6" strokeWidth="0.6">
            <line x1="0" y1="6" x2="26" y2="6" /><line x1="0" y1="12" x2="26" y2="12" />
            <line x1="9" y1="0" x2="9" y2="18" /><line x1="17" y1="0" x2="17" y2="18" />
          </g>
        </g>
        <path d="M30 32 L26 44 L32 44 L28 54 L38 40 L32 40 L36 32 Z" fill={YELLOW} stroke="#f59e0b" strokeWidth="0.5" />
      </svg>
      <div className="leading-none">
        <div className="font-display font-bold text-[17px] tracking-tight" style={{ color: textColor }}>URJAA</div>
        <div className="text-[9px] tracking-[0.22em] font-semibold mt-0.5" style={{ color: sub }}>SOLAR ENERGY</div>
      </div>
    </Link>
  )
}
