'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from './Logo'
import { NAV, SITE } from '@/lib/site-config'

export default function Nav({ transparentOnTop = false }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll(); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isTransparent = transparentOnTop && !scrolled

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${isTransparent ? 'bg-transparent' : 'bg-white border-b border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 lg:h-[70px] flex items-center justify-between">
        <Logo light={isTransparent} />

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map(l => {
            const active = pathname === l.href
            if (l.children) {
              return (
                <div key={l.href} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                  <button className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${isTransparent ? 'text-white/85 hover:text-white' : 'text-slate-700 hover:text-[#0f2447]'}`}>
                    {l.label} <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 pt-2 min-w-[220px]">
                        <div className="rounded-lg bg-white shadow-lg border border-slate-100 py-1.5 overflow-hidden">
                          {l.children.map(c => (
                            <Link key={c.href} href={c.href} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#0f2447] transition-colors">{c.label}</Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }
            return (
              <Link key={l.href} href={l.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${active ? (isTransparent ? 'text-white' : 'text-[#0f2447]') : (isTransparent ? 'text-white/85 hover:text-white' : 'text-slate-700 hover:text-[#0f2447]')}`}>
                {l.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href={`tel:${SITE.phoneDial}`} className={`text-sm font-medium flex items-center gap-1.5 ${isTransparent ? 'text-white/90' : 'text-slate-700'}`}>
            <Phone className="h-3.5 w-3.5" /> {SITE.phone}
          </a>
          <Link href="/contact">
            <Button size="sm" className="bg-[#0f2447] hover:bg-[#0a1a34] text-white font-medium">Get Quote</Button>
          </Link>
        </div>

        <button className={`lg:hidden ${isTransparent ? 'text-white' : 'text-slate-900'}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden bg-white border-t border-slate-200 overflow-hidden">
            <div className="px-5 py-4 flex flex-col">
              {NAV.map(l => (
                <div key={l.href}>
                  <Link onClick={() => setOpen(false)} href={l.href} className="block py-2.5 text-slate-800 font-medium">{l.label}</Link>
                  {l.children && (
                    <div className="pl-4 border-l border-slate-200 ml-1 mb-2">
                      {l.children.map(c => <Link key={c.href} onClick={() => setOpen(false)} href={c.href} className="block py-1.5 text-sm text-slate-600">{c.label}</Link>)}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/contact" onClick={() => setOpen(false)} className="mt-3">
                <Button className="bg-[#0f2447] text-white w-full">Get Quote</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
