'use client'
import { useEffect, useState } from 'react'
import { Trash2, Download, Search, MessageCircle, Phone, Mail } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import AdminShell from '@/components/admin/AdminShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { adminFetch } from '@/lib/admin-auth'
import { SITE } from '@/lib/site-config'

export default function AdminLeads() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')

  const load = async () => {
    setLoading(true)
    try {
      const r = await adminFetch('/api/admin/leads')
      const d = await r.json()
      if (d.ok) setItems(d.items)
    } catch {} finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const filtered = items.filter(l => {
    const matchQ = !q || `${l.name} ${l.phone} ${l.email} ${l.city}`.toLowerCase().includes(q.toLowerCase())
    const matchF = filter === 'all' || l.source === filter
    return matchQ && matchF
  })

  const del = async (id) => {
    if (!confirm('Delete this lead permanently?')) return
    try {
      const r = await adminFetch(`/api/admin/leads/${id}`, { method: 'DELETE' })
      const d = await r.json()
      if (d.ok) { toast.success('Deleted'); load() } else toast.error('Failed')
    } catch { toast.error('Failed') }
  }

  const updateStatus = async (id, status) => {
    try {
      await adminFetch(`/api/admin/leads/${id}`, { method: 'PUT', body: JSON.stringify({ status }) })
      setItems(items.map(x => x.id === id ? { ...x, status } : x))
    } catch {}
  }

  const exportCSV = async () => {
    try {
      const r = await adminFetch('/api/admin/export/leads')
      const blob = await r.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'urjaa-leads.csv'; a.click()
      URL.revokeObjectURL(url)
    } catch { toast.error('Export failed') }
  }

  const badge = (status) => {
    const map = { new: 'bg-blue-50 text-blue-700', contacted: 'bg-amber-50 text-amber-700', converted: 'bg-green-50 text-green-700', lost: 'bg-slate-100 text-slate-600' }
    return map[status] || map.new
  }

  return (
    <AdminShell title="Leads" subtitle={`${items.length} total · ${filtered.length} shown`}>
      <Toaster position="top-center" richColors />
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search name, phone, email, city…" value={q} onChange={e => setQ(e.target.value)} className="pl-9 h-10" />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="h-10 w-full md:w-48"><SelectValue placeholder="Source" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sources</SelectItem>
            <SelectItem value="contact_form">Contact form</SelectItem>
            <SelectItem value="pdf_quote">PDF quote</SelectItem>
            <SelectItem value="contact">Direct contact</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={exportCSV} variant="outline" className="h-10 border-slate-300"><Download className="h-4 w-4 mr-2" /> Export CSV</Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-xs uppercase tracking-widest text-slate-500 font-semibold">
                <th className="px-4 py-3">Lead</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Interest</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && <tr><td colSpan={7} className="py-10 text-center text-slate-500">Loading…</td></tr>}
              {!loading && filtered.length === 0 && <tr><td colSpan={7} className="py-14 text-center text-slate-500">No leads found.</td></tr>}
              {filtered.map((l, i) => (
                <tr key={l.id || i} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-[#0f2447]">{l.name || 'Unnamed'}</div>
                    <div className="text-xs text-slate-500">{l.city || '—'}</div>
                    {l.message && <div className="text-xs text-slate-500 mt-1 max-w-[220px] truncate" title={l.message}>{l.message}</div>}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <div className="flex flex-col gap-1">
                      {l.phone && <a href={`tel:${l.phone}`} className="text-slate-700 hover:text-[#0f2447] inline-flex items-center gap-1.5"><Phone className="h-3 w-3" />{l.phone}</a>}
                      {l.email && <a href={`mailto:${l.email}`} className="text-slate-700 hover:text-[#0f2447] inline-flex items-center gap-1.5"><Mail className="h-3 w-3" />{l.email}</a>}
                      {l.phone && <a href={`https://wa.me/${l.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${l.name || ''}, from Urjaa Solar.`)}`} target="_blank" rel="noreferrer" className="text-[#16a34a] inline-flex items-center gap-1.5"><MessageCircle className="h-3 w-3" />WhatsApp</a>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-700">{l.interest || l.calculation?.input?.consumerType || '—'}</td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">{l.source || '—'}</span></td>
                  <td className="px-4 py-3">
                    <select value={l.status || 'new'} onChange={e => updateStatus(l.id, e.target.value)} className={`text-xs font-medium rounded px-2 py-1 border-0 focus:outline-none ${badge(l.status)}`}>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="lost">Lost</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{new Date(l.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => del(l.id)} className="text-red-500 hover:text-red-700" title="Delete"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  )
}
