'use client'
import { useEffect, useState } from 'react'
import { Plus, Trash2, Package } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import AdminShell from '@/components/admin/AdminShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { adminFetch } from '@/lib/admin-auth'

const EMPTY = { name: '', category: 'solar-panels', brand: '', model: '', capacity: '', efficiency: '', warranty: '', description: '', image_url: '', is_active: true, is_featured: false, sort_order: 0 }

export default function AdminProducts() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    try { const r = await adminFetch('/api/admin/products'); const d = await r.json(); if (d.ok) setItems(d.items || []) } catch {} finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const save = async (event) => {
    event.preventDefault(); setSaving(true)
    try {
      const r = await adminFetch('/api/admin/products', { method: 'POST', body: JSON.stringify(form) })
      const d = await r.json()
      if (!d.ok) throw new Error()
      setItems([d.item, ...items]); setForm(EMPTY); toast.success('Product added')
    } catch { toast.error('Could not add product') } finally { setSaving(false) }
  }

  const remove = async (id) => {
    if (!confirm('Remove this product from the catalogue?')) return
    try { await adminFetch(`/api/admin/products/${id}`, { method: 'DELETE' }); setItems(items.filter(item => item.id !== id)); toast.success('Product removed') } catch { toast.error('Could not remove product') }
  }

  const field = (name, label) => <div><Label className="text-xs uppercase tracking-wider text-slate-600">{label}</Label><Input className="mt-1.5" value={form[name]} onChange={event => setForm({ ...form, [name]: event.target.value })} /></div>

  return <AdminShell title="Products" subtitle="Publish equipment and components on the public catalogue">
    <Toaster position="top-center" richColors />
    <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
      <form onSubmit={save} className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 h-fit">
        <div className="flex items-center gap-2 font-semibold text-[#0f2447]"><Plus className="h-4 w-4" /> Add product</div>
        {field('name', 'Product name')}
        <div className="grid grid-cols-2 gap-3">{field('brand', 'Brand')}{field('model', 'Model')}</div>
        <div className="grid grid-cols-2 gap-3">{field('capacity', 'Capacity')}{field('efficiency', 'Efficiency')}</div>
        {field('warranty', 'Warranty')}
        <div><Label className="text-xs uppercase tracking-wider text-slate-600">Category</Label><select className="mt-1.5 h-10 w-full rounded-md border border-slate-200 px-3 text-sm" value={form.category} onChange={event => setForm({ ...form, category: event.target.value })}><option value="solar-panels">Solar panels</option><option value="inverters">Inverters</option><option value="batteries">Batteries</option><option value="structures">Mounting structures</option><option value="bos">BOS and safety</option></select></div>
        <div><Label className="text-xs uppercase tracking-wider text-slate-600">Description</Label><Textarea className="mt-1.5" rows={3} value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} /></div>
        {field('image_url', 'Image URL')}
        <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={form.is_active} onChange={event => setForm({ ...form, is_active: event.target.checked })} /> Visible on website</label>
        <Button disabled={saving} className="w-full bg-[#0f2447] text-white">{saving ? 'Saving…' : 'Publish product'}</Button>
      </form>
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden"><div className="border-b border-slate-200 px-5 py-4 font-semibold text-[#0f2447]">Catalogue ({items.length})</div>{loading ? <div className="p-8 text-center text-slate-500">Loading…</div> : items.length === 0 ? <div className="p-8 text-center text-slate-500"><Package className="mx-auto mb-2 h-6 w-6" />No products yet.</div> : <div className="divide-y divide-slate-100">{items.map(item => <div key={item.id} className="flex items-center gap-4 p-4"><div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-slate-100">{item.image_url && <img src={item.image_url} alt="" className="h-full w-full object-cover" />}</div><div className="min-w-0 flex-1"><div className="font-medium text-[#0f2447]">{item.name}</div><div className="text-xs text-slate-500">{item.brand || 'Unbranded'} · {item.category} · {item.warranty || 'Warranty not specified'}</div></div><button onClick={() => remove(item.id)} className="text-red-500" title="Remove"><Trash2 className="h-4 w-4" /></button></div>)}</div>}</div>
    </div>
  </AdminShell>
}
