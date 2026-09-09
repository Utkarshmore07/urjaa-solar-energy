'use client'
import { useMemo, useState } from 'react'
import { ArrowRight, BatteryCharging, Calculator, CirclePlus, Gauge, Home, Minus, Plus, Sun, Trash2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const APPLIANCES = [
  { name: 'LED Bulb', watts: 20, hours: 8 },
  { name: 'Ceiling Fan', watts: 75, hours: 10 },
  { name: 'Refrigerator', watts: 300, hours: 24 },
  { name: 'Television', watts: 120, hours: 5 },
  { name: 'Air Conditioner', watts: 1500, hours: 6 },
  { name: 'Water Pump', watts: 750, hours: 2 },
  { name: 'Washing Machine', watts: 500, hours: 1 },
  { name: 'Laptop', watts: 65, hours: 8 },
  { name: 'Iron', watts: 1000, hours: 0.5 },
  { name: 'Microwave', watts: 1200, hours: 0.5 },
]

const standardInverters = [1, 2, 3, 5, 7.5, 10, 15, 20]

export default function LiveLoadCalculator() {
  const [rows, setRows] = useState(APPLIANCES.slice(0, 4).map((item, index) => ({ ...item, id: `${item.name}-${index}`, qty: index === 0 ? 4 : index === 1 ? 4 : 1 })))
  const [backupHours, setBackupHours] = useState(4)
  const [tariff, setTariff] = useState(10)
  const [notice, setNotice] = useState('')

  const result = useMemo(() => {
    const connectedWatts = rows.reduce((sum, row) => sum + row.watts * row.qty, 0)
    const dailyWh = rows.reduce((sum, row) => sum + row.watts * row.qty * row.hours, 0)
    const dailyKwh = dailyWh / 1000
    const recommendedInverter = standardInverters.find(value => value * 1000 >= connectedWatts * 1.25) || Math.ceil(connectedWatts / 1000)
    const solarKw = Math.max(1, Math.ceil((dailyKwh / 4.5 / 0.8) * 10) / 10)
    const batteryKwh = Math.max(1, Math.ceil((connectedWatts / 1000 * backupHours / 0.9) * 10) / 10)
    return { connectedKw: connectedWatts / 1000, dailyKwh, monthlyKwh: dailyKwh * 30, recommendedInverter, solarKw, batteryKwh, estimatedBill: dailyKwh * 30 * tariff }
  }, [rows, backupHours, tariff])

  const updateRow = (id, field, value) => setRows(current => current.map(row => row.id === id ? { ...row, [field]: Math.max(field === 'qty' ? 1 : 0, Number(value) || 0) } : row))
  const addAppliance = event => { const item = APPLIANCES.find(option => option.name === event.target.value); if (!item) return; setRows(current => [...current, { ...item, id: `${item.name}-${Date.now()}`, qty: 1 }]); event.target.value = '' }
  const removeRow = id => setRows(current => current.filter(row => row.id !== id))
  const requestQuote = () => { setNotice('Your load profile is ready. Share these figures with our engineer for a site-specific quote.'); window.location.href = '/contact' }

  return <section className="border-y border-slate-200 bg-[#f5f8fb] py-20" id="load-calculator"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="max-w-2xl"><div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600"><Calculator className="h-4 w-4" /> Live load calculator</div><h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0f2447] md:text-4xl">Know exactly what size system you need.</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">Add your appliances manually. We estimate connected load, daily consumption, inverter size, battery backup and solar array size instantly.</p></div><div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="grid lg:grid-cols-[1.25fr_0.75fr]"><div className="p-5 sm:p-8"><div className="mb-5 flex items-center justify-between"><div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Your appliances</div><div className="mt-1 text-sm font-semibold text-[#0f2447]">Connected load profile</div></div><div className="hidden items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 sm:flex"><span>Watts</span><span>Qty</span><span>Hrs/day</span></div></div><div className="divide-y divide-slate-100 rounded-xl border border-slate-200">{rows.map(row => <div key={row.id} className="grid grid-cols-[1fr_58px_92px_36px] items-center gap-2 px-3 py-3 sm:grid-cols-[1fr_78px_132px_38px] sm:gap-4 sm:px-4"><div className="min-w-0"><div className="truncate text-sm font-semibold text-[#0f2447]">{row.name}</div><div className="text-[10px] text-slate-400 sm:hidden">{row.watts} W · {row.hours} h/day</div></div><div className="text-right text-xs text-slate-500"><span className="hidden sm:inline">{row.watts} W</span><span className="sm:hidden">{row.watts}W</span></div><div className="flex items-center justify-end gap-2"><button type="button" onClick={() => updateRow(row.id, 'qty', row.qty - 1)} className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 text-slate-500"><Minus className="h-3 w-3" /></button><span className="w-5 text-center text-sm font-semibold text-[#0f2447]">{row.qty}</span><button type="button" onClick={() => updateRow(row.id, 'qty', row.qty + 1)} className="flex h-6 w-6 items-center justify-center rounded border border-slate-200 text-slate-500"><Plus className="h-3 w-3" /></button><input aria-label={`${row.name} hours per day`} type="number" min="0" max="24" step="0.5" value={row.hours} onChange={event => updateRow(row.id, 'hours', event.target.value)} className="h-8 w-14 rounded border border-slate-200 px-2 text-center text-xs sm:w-20" /><span className="hidden text-xs text-slate-400 sm:inline">h</span></div><button type="button" onClick={() => removeRow(row.id)} className="flex justify-end text-slate-400 hover:text-rose-500" title="Remove appliance"><Trash2 className="h-4 w-4" /></button></div>)}</div><div className="mt-4 flex flex-wrap items-center gap-3"><CirclePlus className="h-4 w-4 text-emerald-600" /><select onChange={addAppliance} defaultValue="" className="h-10 rounded-full border border-slate-300 bg-white px-4 text-sm text-[#0f2447]"><option value="">Add appliance</option>{APPLIANCES.filter(item => !rows.some(row => row.name === item.name)).map(item => <option key={item.name} value={item.name}>{item.name} · {item.watts} W</option>)}</select><span className="text-xs text-slate-400">Add every regular load for a more accurate estimate.</span></div></div><aside className="bg-[#0f2447] p-5 text-white sm:p-8"><div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300"><Gauge className="h-4 w-4" /> Live result</div><div className="mt-5 grid grid-cols-2 gap-2"><Metric label="Total load" value={`${result.connectedKw.toFixed(2)} kW`} /><Metric label="Daily consumption" value={`${result.dailyKwh.toFixed(1)} kWh`} /><Metric label="Monthly consumption" value={`${result.monthlyKwh.toFixed(0)} kWh`} /><Metric label="Estimated bill" value={`₹${Math.round(result.estimatedBill).toLocaleString('en-IN')}`} /></div><div className="mt-3 grid grid-cols-1 gap-2"><Metric label="Recommended inverter" value={`${result.recommendedInverter} kW`} icon={<Zap className="h-4 w-4 text-emerald-300" />} /><Metric label="Solar array" value={`${result.solarKw} kW`} icon={<Sun className="h-4 w-4 text-amber-300" />} /><Metric label={`Battery for ${backupHours} hr backup`} value={`${result.batteryKwh} kWh`} icon={<BatteryCharging className="h-4 w-4 text-sky-300" />} /></div><div className="mt-6 grid grid-cols-2 gap-3"><label className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Backup hours<select value={backupHours} onChange={event => setBackupHours(Number(event.target.value))} className="mt-1.5 h-10 w-full rounded-lg border border-white/15 bg-white/10 px-3 text-sm text-white"><option className="text-slate-900" value="2">2 hours</option><option className="text-slate-900" value="4">4 hours</option><option className="text-slate-900" value="6">6 hours</option><option className="text-slate-900" value="8">8 hours</option></select></label><label className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Tariff / kWh<input type="number" min="1" value={tariff} onChange={event => setTariff(Number(event.target.value) || 1)} className="mt-1.5 h-10 w-full rounded-lg border border-white/15 bg-white/10 px-3 text-sm text-white" /></label></div><Button onClick={requestQuote} className="mt-6 h-11 w-full bg-amber-400 font-semibold text-[#0f2447] hover:bg-amber-300">Discuss this system <ArrowRight className="ml-2 h-4 w-4" /></Button>{notice && <p className="mt-3 text-center text-xs text-emerald-200">{notice}</p>}<p className="mt-5 flex items-start gap-2 text-[10px] leading-relaxed text-white/50"><Home className="mt-0.5 h-3 w-3 shrink-0" /> Estimates use appliance load and standard solar yield assumptions. Final sizing requires a physical survey and shadow analysis.</p></aside></div></div></div></section>
}

function Metric({ label, value, icon }) {
  return <div className="rounded-lg border border-white/10 bg-white/[0.08] p-3"><div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-white/55">{label}{icon}</div><div className="mt-1 font-display text-lg font-semibold text-white">{value}</div></div>
}
