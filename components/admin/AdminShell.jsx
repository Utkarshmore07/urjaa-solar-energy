'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LayoutDashboard, Users, Calculator, Package, UserRound, Settings, LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/site/Logo'
import { getAdminSession, signOut } from '@/lib/admin-auth'

const LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/calculations', label: 'Calculations', icon: Calculator },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/customers', label: 'Customer Portals', icon: UserRound },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminShell({ children, title, subtitle }) {
  const pathname = usePathname()
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    getAdminSession().then(session => {
      if (!session) { router.replace('/admin/login'); return }
      setReady(true)
    })
  }, [router])

  const logout = async () => { await signOut(); router.replace('/admin/login') }

  if (!ready) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading…</div>

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-0 left-0 z-40 w-64 h-screen bg-white border-r border-slate-200 transition-transform`}>
        <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between">
          <Logo />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-600"><X className="h-5 w-5" /></button>
        </div>
        <nav className="p-3 space-y-0.5">
          {LINKS.map(l => {
            const Icon = l.icon
            const active = pathname === l.href
            return (
              <Link key={l.href} href={l.href} onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${active ? 'bg-[#0f2447] text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
                <Icon className="h-4 w-4" /> {l.label}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-200">
          <Link href="/" className="block text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5">← View public site</Link>
          <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 transition-colors">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600"><Menu className="h-5 w-5" /></button>
            <div>
              <div className="font-display font-semibold text-[#0f2447] text-base leading-none">{title}</div>
              {subtitle && <div className="text-xs text-slate-500 mt-0.5">{subtitle}</div>}
            </div>
          </div>
          <div className="text-xs text-slate-500">Admin</div>
        </header>
        <div className="p-5 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
