'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Users, Calculator, TrendingUp, Clock, ExternalLink } from 'lucide-react'
import { Toaster } from 'sonner'
import AdminShell from '@/components/admin/AdminShell'
import { adminFetch } from '@/lib/admin-auth'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const r = await adminFetch('/api/admin/stats')
        const d = await r.json()
        if (d.ok) setStats(d)
      } catch {} finally { setLoading(false) }
    })()
  }, [])

  return (
    <AdminShell title="Dashboard" subtitle="Overview of leads and calculator activity">
      <Toaster position="top-center" richColors />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {[
          { label: 'Total Leads', v: stats?.leads ?? '—', icon: <Users className="h-5 w-5" /> },
          { label: 'Calculator Runs', v: stats?.calcs ?? '—', icon: <Calculator className="h-5 w-5" /> },
          { label: 'From PDF Quote', v: stats?.bySource?.find(x => x._id === 'pdf_quote')?.count ?? 0, icon: <TrendingUp className="h-5 w-5" /> },
          { label: 'From Contact Form', v: stats?.bySource?.find(x => x._id === 'contact_form')?.count ?? 0, icon: <Clock className="h-5 w-5" /> },
        ].map((s, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="h-9 w-9 rounded-md bg-slate-100 text-[#0f2447] flex items-center justify-center mb-3">{s.icon}</div>
            <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{s.label}</div>
            <div className="font-display font-bold text-2xl lg:text-3xl mt-1 text-[#0f2447]">{loading ? '…' : s.v}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="font-semibold text-[#0f2447]">Recent Leads</div>
            <div className="text-xs text-slate-500 mt-0.5">Latest 5 enquiries</div>
          </div>
          <Link href="/admin/leads" className="text-sm text-[#0f2447] font-medium hover:underline inline-flex items-center gap-1">View all <ExternalLink className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="divide-y divide-slate-100">
          {loading && <div className="px-5 py-10 text-center text-slate-500 text-sm">Loading…</div>}
          {!loading && (!stats?.recent || stats.recent.length === 0) && <div className="px-5 py-10 text-center text-slate-500 text-sm">No leads yet.</div>}
          {stats?.recent?.map((l, i) => (
            <div key={i} className="px-5 py-4 grid grid-cols-12 gap-3 items-center">
              <div className="col-span-4">
                <div className="font-medium text-[#0f2447] text-sm">{l.name || 'Unnamed'}</div>
                <div className="text-xs text-slate-500">{l.phone} · {l.city || '—'}</div>
              </div>
              <div className="col-span-4 text-xs text-slate-600">{l.email || '—'}</div>
              <div className="col-span-2 text-xs"><span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">{l.source || 'contact'}</span></div>
              <div className="col-span-2 text-xs text-slate-500 text-right">{new Date(l.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  )
}
