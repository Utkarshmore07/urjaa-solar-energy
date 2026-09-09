'use client'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import AdminShell from '@/components/admin/AdminShell'
import { adminFetch } from '@/lib/admin-auth'

export default function AdminCalculations() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try { const r = await adminFetch('/api/admin/calculations'); const d = await r.json(); if (d.ok) setItems(d.items) } catch {} finally { setLoading(false) }
    })()
  }, [])

  return (
    <AdminShell title="Calculator Submissions" subtitle={`${items.length} total`}>
      <Toaster position="top-center" richColors />
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-xs uppercase tracking-widest text-slate-500 font-semibold">
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Bill</th>
                <th className="px-4 py-3">Roof</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">System</th>
                <th className="px-4 py-3">Net Cost</th>
                <th className="px-4 py-3">Payback</th>
                <th className="px-4 py-3">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && <tr><td colSpan={8} className="py-10 text-center text-slate-500">Loading…</td></tr>}
              {!loading && items.length === 0 && <tr><td colSpan={8} className="py-14 text-center text-slate-500">No calculations yet.</td></tr>}
              {items.map((c, i) => (
                <tr key={c.id || i} className="hover:bg-slate-50">
                  <td className="px-4 py-3"><div className="text-[#0f2447] font-medium">{c.input?.city || '—'}</div><div className="text-xs text-slate-500">{c.input?.state}</div></td>
                  <td className="px-4 py-3">₹{(c.input?.monthlyBill || 0).toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">{c.input?.roofArea || 0} sqft</td>
                  <td className="px-4 py-3 capitalize">{c.input?.consumerType || '—'}</td>
                  <td className="px-4 py-3 font-semibold text-[#0f2447]">{c.result?.kw} kW</td>
                  <td className="px-4 py-3">₹{(c.result?.netCost || 0).toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3">{c.result?.payback} yrs</td>
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{new Date(c.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  )
}
