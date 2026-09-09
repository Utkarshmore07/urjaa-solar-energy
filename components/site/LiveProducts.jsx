'use client'
import { useEffect, useState } from 'react'
import { Package } from 'lucide-react'

export default function LiveProducts() {
  const [items, setItems] = useState([])
  useEffect(() => { fetch('/api/products').then(response => response.json()).then(data => { if (data.ok) setItems(data.items || []) }).catch(() => {}) }, [])
  if (!items.length) return null
  return <section className="border-y border-slate-200 bg-slate-50 py-14"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mb-8 flex items-end justify-between gap-4"><div><div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">Live catalogue</div><h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0f2447]">Current equipment and components.</h2></div><Package className="h-7 w-7 text-slate-400" /></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{items.map(item => <article key={item.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white"><div className="aspect-[4/3] bg-slate-100">{item.image_url && <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />}</div><div className="p-4"><div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{item.category}</div><h3 className="mt-1 font-semibold text-[#0f2447]">{item.name}</h3><p className="mt-1 text-xs text-slate-500">{item.brand} {item.model}</p><p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p><div className="mt-4 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500">{item.capacity || 'Site-specific sizing'} · {item.warranty || 'Warranty confirmed in quotation'}</div></div></article>)}</div></div></section>
}
