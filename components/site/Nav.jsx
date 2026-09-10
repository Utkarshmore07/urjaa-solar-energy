'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from './Logo'
import { NAV, SITE } from '@/lib/site-config'
import { useResponsiveDevice } from '@/hooks/use-mobile'

export default function Nav({ transparentOnTop = false }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()
  const { isMobile } = useResponsiveDevice()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll(); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMobile) setOpen(false)
  }, [isMobile])

  const isTransparent = transparentOnTop && !scrolled

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${isTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-sm border-b border-slate-200/80'}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-5 lg:h-[70px] lg:px-8">
        <Logo light={isTransparent} />

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map(l => {
            const active = pathname === l.href
            if (l.children) {
              return (
                <div key={l.href} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                  <button className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${isTransparent ? 'text-white/85 hover:text-white' : 'text-slate-700 hover:text-[#0f2447]'}`}>
                    {l.label} <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full min-w-[220px] pt-2">
                        <div className="overflow-hidden rounded-lg border border-slate-100 bg-white py-1.5 shadow-lg">
                          {l.children.map(c => (
                            <Link key={c.href} href={c.href} className="block px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#0f2447]">{c.label}</Link>
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
          <a href={`tel:${SITE.phoneDial}`} className={`flex items-center gap-1.5 text-sm font-medium ${isTransparent ? 'text-white/90' : 'text-slate-700'}`}>
            <Phone className="h-3.5 w-3.5" /> {SITE.phone}
          </a>
          <Link href="/contact">
            <Button size="sm" className="bg-[#0f2447] font-medium text-white hover:bg-[#0a1a34]">Get Quote</Button>
          </Link>
        </div>

        <button
          type="button"
          className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-sm transition lg:hidden ${isTransparent ? 'border-white/15 text-white' : 'border-slate-200 bg-white text-slate-900'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: 'easeInOut' }} className="overflow-hidden border-t border-slate-200 bg-white/95 backdrop-blur-sm lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-5">
              {NAV.map(l => (
                <div key={l.href} className="rounded-xl border border-slate-100 bg-slate-50/80">
                  <Link onClick={() => setOpen(false)} href={l.href} className="block px-4 py-3 text-base font-medium text-slate-800">{l.label}</Link>
                  {l.children && (
                    <div className="border-t border-slate-200 px-3 py-2">
                      {l.children.map(c => <Link key={c.href} onClick={() => setOpen(false)} href={c.href} className="block px-2 py-2 text-sm text-slate-600">{c.label}</Link>)}
                    </div>
                  )}
                </div>
              ))}
              <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 block">
                <Button className="w-full bg-[#0f2447] text-white hover:bg-[#0a1a34]">Get Quote</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
