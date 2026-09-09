'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ShieldCheck, Wrench, CheckCircle2, Sun, FileText, Sparkles, Star, Clock, Phone, MessageCircle, ClipboardCheck, BarChart3, PhoneCall, Zap, Award, Users, TrendingUp, Building2, MapPin, Home, Gauge } from 'lucide-react'
import { Toaster } from 'sonner'
import { Button } from '@/components/ui/button'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import CinematicSolarHero from '@/components/cinematic/CinematicSolarHero'
import { SITE, SERVICES, TESTIMONIALS } from '@/lib/site-config'

const Calculator = dynamic(() => import('@/components/site/Calculator'), {
  ssr: false,
  loading: () => <div className="min-h-[520px] rounded-xl border border-slate-200 bg-slate-50" aria-label="Loading solar calculator" />,
})

const NAVY = '#0f2447'
const EMERALD = '#16a34a'
const AMBER = '#fbbf24'

const DEFAULT_STATS = [
  { value: '25', suffix: '+', label: 'Projects Completed' },
  { value: '50 kW', suffix: '+', label: 'Installed Capacity' },
  { value: '20', suffix: '+', label: 'Happy Customers' },
  { value: '2025', suffix: '', label: 'Established' },
]

// ─── Trust Stats ───────────────────────────────────────────────────────────────
function TrustStats() {
  const [stats, setStats] = useState(DEFAULT_STATS)

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(d => {
      if (d.ok && d.stats?.length) {
        setStats(d.stats.map(s => ({ value: s.value, suffix: s.suffix || '', label: s.label, icon: s.icon })))
      }
    }).catch(() => {})
  }, [])

  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center pt-14 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full border border-slate-200 mb-4"
          >
            <Star className="h-3.5 w-3.5 text-amber-500 fill-current" />
            <span className="text-[11px] font-semibold text-slate-600 tracking-wide">Our Impact</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-3xl md:text-4xl font-bold leading-tight"
            style={{ color: NAVY }}
          >
            Numbers that speak for themselves
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-2 text-sm text-slate-500 max-w-md mx-auto"
          >
            Trusted by residential and commercial customers across Uttar Pradesh
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="text-center py-10 px-4 group"
            >
              <div
                className="font-display text-4xl lg:text-5xl font-bold leading-none"
                style={{ color: NAVY }}
              >
                {s.value}
                <span style={{ color: EMERALD }}>{s.suffix}</span>
              </div>
              <div className="text-sm text-slate-500 mt-2 group-hover:text-slate-600 transition-colors">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Value Props ───────────────────────────────────────────────────────────────
function ValueProps() {
  const items = [
    { icon: <ClipboardCheck className="h-5 w-5" />, t: 'Free Site Survey', d: 'A qualified engineer visits your site, measures the roof, and assesses shading and structural fitness before any commitment.' },
    { icon: <FileText className="h-5 w-5" />, t: 'Transparent Quotation', d: 'We share a written BOQ with brand-wise pricing, warranty details and subsidy eligibility. No hidden costs.' },
    { icon: <Wrench className="h-5 w-5" />, t: 'Certified Installation', d: 'Installation is executed by our own trained crew using MNRE-approved components and IS-compliant structures.' },
    { icon: <ShieldCheck className="h-5 w-5" />, t: 'Post-install Support', d: 'Warranty handover, DISCOM net-metering coordination and free service visits after commissioning.' },
  ]

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: EMERALD }}
          >
            Our Approach
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-3xl md:text-4xl font-bold tracking-tight max-w-xl mx-auto"
            style={{ color: NAVY }}
          >
            A straightforward, engineering-led process.
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div
                className="h-11 w-11 rounded-lg flex items-center justify-center mb-4"
                style={{ background: `linear-gradient(135deg, ${EMERALD}, ${AMBER})` }}
              >
                <div className="text-white">{it.icon}</div>
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: NAVY }}>{it.t}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{it.d}</p>
            </motion.div>
          ))}
        </div>

        <SystemDiagram />
      </div>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const featuredServices = SERVICES.filter((service) => service.slug !== 'hybrid-solar-system')

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: EMERALD }}>Solar Services</div>
            <h2
              className="font-display text-3xl md:text-4xl font-bold tracking-tight max-w-xl"
              style={{ color: NAVY }}
            >
              Five categories. One promise — honest engineering.
            </h2>
            <p className="mt-3 text-sm text-slate-500 max-w-md">
              From village atta chakkis to industrial roofs, we design solar systems that fit the site, budget and use-case.
            </p>
          </motion.div>

          {/* Market Insight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-slate-200 bg-slate-50 p-5 min-w-[240px]"
          >
            <div className="text-[11px] text-slate-500 font-semibold tracking-wide uppercase mb-1">Today&apos;s Market</div>
            <div className="text-2xl font-bold" style={{ color: NAVY }}>₹18.50 / kWh</div>
            <div className="text-xs text-slate-400 mt-0.5">Avg. industrial tariff in UP</div>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: EMERALD }} />
                <span className="text-xs text-slate-600">Solar LCOE: ₹6.50 / kWh</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: AMBER }} />
                <span className="text-xs text-slate-600">Savings: 60%+ over 25 yrs</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {featuredServices.map((it, i) => (
            <motion.div
              key={it.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
            >
              <Link
                href={`/services/${it.slug}`}
                className="group block rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all h-full"
              >
                <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={it.img}
                    alt={it.label}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                </div>
                <div className="p-5 bg-white">
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">{it.range}</div>
                  <h3 className="font-semibold text-base mt-1" style={{ color: NAVY }}>{it.label}</h3>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed line-clamp-2">{it.desc}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium" style={{ color: EMERALD }}>
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ComponentQualitySection() {
  const rows = [
    { code: 'PV-01', title: 'Solar module', spec: 'Tier-1 mono PERC / TOPCon', detail: 'Documented serials, stronger bankability and manufacturer performance warranty', warning: 'Budget module only when approved in the final BOQ', tone: 'amber' },
    { code: 'MS-02', title: 'Mounting structure', spec: 'Hot-dip galvanised steel', detail: 'Site-measured, corrosion protected and designed for local wind exposure', warning: 'Light-gauge or untreated steel is not accepted for standard projects', tone: 'emerald' },
    { code: 'BOS-03', title: 'Electrical protection', spec: 'DCDB, ACDB, SPD and earthing', detail: 'Protection sized to the final system and commissioning checks', warning: 'Incomplete protection increases operational and safety risk', tone: 'blue' },
  ]
  return <section className="border-y border-slate-200 bg-[#f4f7f7] py-20"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div className="max-w-2xl"><div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Specification clarity</div><h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0f2447] md:text-4xl">The parts behind a dependable solar system.</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">A proper quotation is more than a panel name. We show the structure, protection and checks that determine performance over time.</p></div><div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-right"><div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Engineering review</div><div className="mt-1 font-mono text-sm font-semibold text-[#0f2447]">BOQ / SITE / QA</div></div></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{rows.map(row => <article key={row.code} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"><div className={`absolute inset-x-0 top-0 h-1 ${row.tone === 'amber' ? 'bg-amber-400' : row.tone === 'emerald' ? 'bg-emerald-500' : 'bg-sky-500'}`} /><div className="flex items-start justify-between"><div><div className="font-mono text-[10px] font-bold tracking-[0.18em] text-slate-400">{row.code}</div><h3 className="mt-3 text-lg font-bold text-[#0f2447]">{row.title}</h3></div><div className={`flex h-10 w-10 items-center justify-center rounded-lg ${row.tone === 'amber' ? 'bg-amber-50 text-amber-500' : row.tone === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'}`}><ShieldCheck className="h-5 w-5" /></div></div><div className="mt-6 border-l-2 border-slate-200 pl-4"><div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Recommended specification</div><div className="mt-1 text-sm font-semibold text-[#0f2447]">{row.spec}</div><p className="mt-3 text-sm leading-relaxed text-slate-600">{row.detail}</p></div><div className="mt-6 flex gap-2 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500"><span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-rose-400" />{row.warning}</div></article>)}</div><div className="mt-6 flex items-center gap-3 text-xs text-slate-500"><div className="h-px flex-1 bg-slate-200" /><span>Final brands and model numbers are confirmed after physical survey.</span><div className="h-px flex-1 bg-slate-200" /></div></div></section>
}

function SystemDiagram() {
  const stages = [
    { n: '01', title: 'Solar array', detail: 'Panels convert sunlight into DC power.', icon: Sun, tone: 'amber' },
    { n: '02', title: 'Inverter', detail: 'Power is converted into usable AC.', icon: Zap, tone: 'emerald' },
    { n: '03', title: 'Net meter', detail: 'Import and export are measured precisely.', icon: Gauge, tone: 'blue' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-12 overflow-hidden rounded-2xl border border-[#274363] bg-[#0b1d35] shadow-xl"
    >
      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative overflow-hidden border-b border-white/10 px-6 py-8 sm:px-10 lg:border-b-0 lg:border-r lg:py-10">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300"><span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Field logic</div>
            <h3 className="mt-4 max-w-sm font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">From sunlight to useful power.</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-300">Every system is designed around the actual movement of energy through your site, not a one-size-fits-all package.</p>
            <div className="mt-8 flex items-center gap-3 text-xs text-slate-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-300/30 bg-amber-300/10 text-amber-300"><Sun className="h-5 w-5" /></div>
              <div><div className="font-semibold text-white">Daylight generation</div><div className="mt-1 text-slate-400">Clean DC energy from the roof</div></div>
            </div>
            <div className="my-4 ml-5 h-8 border-l border-dashed border-amber-300/40" />
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-300/30 bg-emerald-300/10 text-emerald-300"><Gauge className="h-5 w-5" /></div>
              <div><div className="font-semibold text-white">Measured delivery</div><div className="mt-1 text-slate-400">Power for the home and the grid</div></div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mb-7 flex items-center justify-between">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">On-grid architecture</div>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Grid-ready</div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {stages.map((stage, index) => {
              const Icon = stage.icon
              return (
                <div key={stage.n} className="relative rounded-xl border border-white/10 bg-white/[0.06] p-4">
                  {index < stages.length - 1 && <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-emerald-300 md:block" />}
                  <div className="flex items-center justify-between"><span className="text-[10px] font-bold tracking-[0.16em] text-slate-500">{stage.n}</span><Icon className={`h-5 w-5 ${stage.tone === 'amber' ? 'text-amber-300' : stage.tone === 'emerald' ? 'text-emerald-300' : 'text-sky-300'}`} /></div>
                  <div className="mt-7 text-sm font-semibold text-white">{stage.title}</div>
                  <div className="mt-1.5 text-xs leading-relaxed text-slate-400">{stage.detail}</div>
                </div>
              )
            })}
          </div>

          <div className="relative mt-3 grid gap-3 md:grid-cols-2 md:gap-8">
            <div className="absolute left-1/2 -top-3 hidden h-3 border-l border-dashed border-emerald-300/50 md:block" />
            <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/[0.08] p-4"><div className="flex items-center gap-2 text-sm font-semibold text-emerald-200"><Home className="h-4 w-4" /> Home consumption</div><div className="mt-1.5 text-xs text-slate-400">Solar power is used on-site first.</div></div>
            <div className="rounded-xl border border-sky-300/20 bg-sky-300/[0.08] p-4"><div className="flex items-center gap-2 text-sm font-semibold text-sky-200"><Zap className="h-4 w-4" /> Utility grid</div><div className="mt-1.5 text-xs text-slate-400">Surplus exports out; backup imports in.</div></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Process / Timeline ────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  { n: '01', t: 'Free Consultation', d: 'We understand your energy needs, site type and goals before any commitment.' },
  { n: '02', t: 'Site Survey', d: 'A qualified engineer visits to measure the roof, assess shading and structural fitness.' },
  { n: '03', t: 'System Design', d: 'Custom solar design based on your actual electricity profile and available roof area.' },
  { n: '04', t: 'Written Quotation', d: 'Detailed BOQ with brand-wise pricing, warranty details and subsidy eligibility.' },
  { n: '05', t: 'Documentation', d: 'PM Surya Ghar registration and DISCOM application — we handle the paperwork.' },
  { n: '06', t: 'Installation', d: '3–7 days for residential systems using our own trained installation crew.' },
  { n: '07', t: 'Commissioning', d: 'Full system testing, inverter configuration and safety checks before handover.' },
  { n: '08', t: 'Net Metering', d: 'DISCOM bidirectional meter installation and grid connection activation.' },
  { n: '09', t: 'After-sales Support', d: 'Warranty documents, monitoring setup and free service visits in year one.' },
]

function InstallTimeline() {
  const phases = [
    { label: 'Discover', range: '01—03', steps: PROCESS_STEPS.slice(0, 3), tone: 'emerald' },
    { label: 'Design & approve', range: '04—05', steps: PROCESS_STEPS.slice(3, 5), tone: 'amber' },
    { label: 'Build & activate', range: '06—09', steps: PROCESS_STEPS.slice(5), tone: 'blue' },
  ]

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: EMERALD }}
          >
            The Process
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display text-3xl md:text-4xl font-bold tracking-tight max-w-xl mx-auto"
            style={{ color: NAVY }}
          >
            From first call to full generation — 9 clear steps.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-sm text-slate-500 max-w-xl mx-auto"
          >
            No surprises. Every step is explained before we begin.
          </motion.p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {phases.map((phase, phaseIndex) => (
            <motion.div key={phase.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: phaseIndex * 0.1, duration: 0.5 }} className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4"><div><div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Phase {phaseIndex + 1}</div><h3 className="mt-1 font-display text-lg font-bold text-[#0f2447]">{phase.label}</h3></div><span className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold ${phase.tone === 'emerald' ? 'bg-emerald-50 text-emerald-700' : phase.tone === 'amber' ? 'bg-amber-50 text-amber-700' : 'bg-sky-50 text-sky-700'}`}>{phase.range}</span></div>
              <div className="relative mt-5 space-y-5 before:absolute before:bottom-3 before:left-[15px] before:top-3 before:w-px before:bg-slate-200">{phase.steps.map(step => <div key={step.n} className="relative flex gap-3"><div className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-4 border-white text-[10px] font-bold text-white shadow-sm ${phase.tone === 'emerald' ? 'bg-emerald-600' : phase.tone === 'amber' ? 'bg-amber-500' : 'bg-sky-600'}`}>{step.n}</div><div className="pt-0.5"><div className="text-sm font-semibold text-[#0f2447]">{step.t}</div><p className="mt-1 text-xs leading-relaxed text-slate-500">{step.d}</p></div></div>)}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-[11px] text-slate-400 mt-8 text-center"
        >
          End-to-end timeline is typically 3–6 weeks for residential systems, subject to DISCOM processing times.
        </motion.p>
      </div>
    </section>
  )
}

// ─── Calculator Section ────────────────────────────────────────────────────────
function CalculatorSection() {
  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* Section Header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: EMERALD }}>Solar Calculator</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight max-w-lg mx-auto" style={{ color: NAVY }}>
            Get an indicative estimate in 30 seconds.
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Enter your monthly electricity bill, state and available roof area to get a preliminary system-size, subsidy eligibility and 25-year savings estimate.
          </p>
        </motion.div>

        {/* Calculator — full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Calculator />
        </motion.div>

        {/* Bottom contact strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm"
        >
          <div className="flex items-center gap-6 text-slate-500">
            <a href={`tel:${SITE.phoneDial}`} className="flex items-center gap-2 hover:text-slate-800 transition-colors">
              <PhoneCall className="h-4 w-4" style={{ color: EMERALD }} /> {SITE.phone}
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-green-600 transition-colors">
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
          </div>
          <div className="hidden sm:block h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-5">
            {[
              { icon: <ShieldCheck className="h-4 w-4" />, text: 'MNRE Approved' },
              { icon: <Zap className="h-4 w-4" />, text: 'End-to-End EPC' },
              { icon: <CheckCircle2 className="h-4 w-4" />, text: 'Subsidy Help' },
            ].map((it, i) => (
              <div key={i} className="flex items-center gap-1.5 text-slate-500">
                <span style={{ color: EMERALD }}>{it.icon}</span>
                <span className="text-xs">{it.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

// ─── Subsidy ─────────────────────────────────────────────────────────────────
function Subsidy() {
  return (
    <section className="py-20" style={{ background: NAVY }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-white"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 text-[11px] font-semibold mb-5">
            <ShieldCheck className="h-3.5 w-3.5" />
            PM Surya Ghar Muft Bijli Yojana
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            Government subsidy for residential rooftop solar.
          </h2>

          <p className="mt-5 text-white/75 text-sm leading-relaxed">
            Eligible residential customers can avail Central Financial Assistance (CFA) under the PM Surya Ghar scheme. Urjaa Solar assists with the online registration, technical feasibility and DISCOM coordination — you focus on your family, we handle the paperwork.
          </p>

          <div className="mt-8 space-y-2">
            {[
              { k: 'Up to 2 kW', v: 'INR 30,000 per kW' },
              { k: '2–3 kW', v: 'INR 18,000 per additional kW' },
              { k: 'Above 3 kW', v: 'Maximum INR 78,000' },
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex justify-between items-center border border-white/10 rounded-lg px-4 py-3"
              >
                <span className="text-white/70 text-sm">{r.k}</span>
                <span className="font-semibold text-sm">{r.v}</span>
              </motion.div>
            ))}
          </div>

          <p className="text-[11px] text-white/35 mt-4">Source: MNRE, Government of India. Subsidy subject to eligibility and prevailing guidelines.</p>
        </motion.div>

        {/* Right — Eligibility Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-2xl border border-white/20 p-7" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="text-white/50 text-[11px] tracking-widest uppercase font-semibold mb-5">Who is eligible</div>
            <ul className="space-y-3">
              {[
                'Indian residential household with a valid electricity connection',
                'Owned or NOC-authorised rooftop with shadow-free area',
                'Registration via the National Portal (pmsuryaghar.gov.in)',
                'Installation done by an MNRE-empanelled vendor',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: '#4ade80' }} />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-900 hover:opacity-90 transition-opacity"
              style={{ background: AMBER }}
            >
              Check my eligibility <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Credentials Marquee ───────────────────────────────────────────────────
function CredentialsMarquee() {
  const marks = [
    { src: 'https://www.jsentsolar.in/assets/images/msme.png', alt: 'MSME', label: 'MSME' },
    { src: 'https://www.jsentsolar.in/assets/images/dcr%20verification.png', alt: 'DCR verification', label: 'DCR verification' },
    { src: 'https://www.jsentsolar.in/assets/images/pm%20saurya%20ghar.png', alt: 'PM Surya Ghar Muft Bijli Yojana', label: 'PM Surya Ghar' },
    { src: 'https://www.jsentsolar.in/assets/images/cm-yuva.png', alt: 'CM Yuva', label: 'CM Yuva' },
    { src: 'https://upnedasolarrooftopportal.com/images/logo.png', alt: 'UPNEDA solar rooftop portal', label: 'UPNEDA' },
    { src: 'https://consumer.pmsuryaghar.gov.in/consumer/assets/images/logo.svg', alt: 'PM Surya Ghar consumer portal', label: 'PM Surya Ghar portal' },
  ]

  return (
    <section className="border-y border-slate-200 bg-white py-14 md:py-16 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl px-5 lg:px-8"
      >
        <div className="text-center mb-10">
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-400 mb-3">
            Schemes &amp; standards we work with
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight" style={{ color: NAVY }}>
            Built around the right standards.
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto">
            We keep every installation aligned with the documentation, quality checks and government processes that matter.
          </p>
        </div>

        <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee-left">
            {[...marks, ...marks].map((mark, i) => (
              <div key={`${mark.label}-${i}`} className="group flex min-h-20 w-[190px] shrink-0 items-center justify-center px-5">
                <img
                  src={mark.src}
                  alt={mark.alt}
                  title={mark.label}
                  className="h-16 w-auto max-w-[170px] object-contain grayscale opacity-55 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-slate-100 pt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          <span className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Site inspected</span>
          <span className="hidden sm:block h-1 w-1 rounded-full bg-amber-400" />
          <span className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-amber-500" /> Documentation included</span>
          <span className="hidden sm:block h-1 w-1 rounded-full bg-amber-400" />
          <span className="flex items-center gap-2"><Award className="h-3.5 w-3.5 text-slate-500" /> Quality assured</span>
        </div>
      </motion.div>
    </section>
  )
}

// ─── Trust Credibility Score (TCS) ───────────────────────────────────────
function TrustScore() {
  const scoreItems = [
    { value: '25+', label: 'Projects Delivered', icon: <Zap className="h-5 w-5" />, color: '#fbbf24' },
    { value: '100%', label: 'Customer Satisfaction', icon: <Star className="h-5 w-5" />, color: '#16a34a' },
    { value: '5+', label: 'Districts Covered', icon: <MapPin className="h-5 w-5" />, color: '#3b82f6' },
    { value: '0', label: 'Customer Complaints', icon: <ShieldCheck className="h-5 w-5" />, color: '#a855f7' },
  ]

  return (
    <section className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: EMERALD }}>
            Our Promise
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight max-w-xl mx-auto" style={{ color: NAVY }}>
            Numbers that define our commitment.
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-lg mx-auto">
            Every metric below reflects a promise we make and deliver on — not just on paper, but in reality.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {scoreItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, type: 'spring', stiffness: 100 }}
              className="relative rounded-2xl border border-slate-200 bg-white p-7 text-center overflow-hidden group hover:border-slate-300 hover:shadow-xl transition-all duration-500"
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${item.color}15 0%, transparent 70%)` }}
              />
              {/* Icon */}
              <div
                className="h-14 w-14 rounded-2xl mx-auto mb-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${item.color}15`, color: item.color }}
              >
                {item.icon}
              </div>
              {/* Value */}
              <div
                className="font-display text-4xl font-black mb-2 transition-all duration-300"
                style={{ color: item.color }}
              >
                {item.value}
              </div>
              {/* Label */}
              <div className="text-sm font-medium text-slate-600">{item.label}</div>
              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: item.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
        >
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            All work backed by written warranty
          </div>
          <div className="hidden sm:block h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone className="h-4 w-4 text-emerald-500" />
            Direct owner contact — no call centre
          </div>
          <div className="hidden sm:block h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <FileText className="h-4 w-4 text-emerald-500" />
            Written BOQ with every quotation
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Certifications ──────────────────────────────────────────────────────────
function Certifications() {
  return null // Replaced by CredentialsMarquee
}

// ─── Testimonials ────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: EMERALD }}>
            Customer Stories
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight max-w-xl mx-auto" style={{ color: NAVY }}>
            What our customers say.
          </h2>
          <div className="mt-3 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
            ))}
            <span className="text-sm text-slate-600 ml-2">4.8/5 based on customer reviews</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 text-amber-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0f2447]">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Why Choose Us — Advanced Features ───────────────────────────────────────
function WhyChooseUs() {
  const items = [
    { icon: <ClipboardCheck className="h-5 w-5" />, t: 'Engineer-led design', d: 'Every project starts with a physical survey, shadow analysis and structural assessment by a qualified engineer.' },
    { icon: <ShieldCheck className="h-5 w-5" />, t: '25-year panel warranty', d: 'Tier-1 monocrystalline panels with manufacturer-backed 25-year linear performance warranty.' },
    { icon: <TrendingUp className="h-5 w-5" />, t: 'Real-time monitoring', d: 'Wi-Fi enabled inverter with mobile app — track generation, savings and carbon offset 24×7.' },
    { icon: <Building2 className="h-5 w-5" />, t: 'In-house installation team', d: 'Trained, full-time technicians. We never outsource the core electrical work to third parties.' },
    { icon: <Users className="h-5 w-5" />, t: 'Single point of contact', d: 'A dedicated project manager from survey to commissioning. No being passed between departments.' },
    { icon: <Award className="h-5 w-5" />, t: 'Subsidy end-to-end', d: 'PM Surya Ghar registration, technical feasibility, and DISCOM coordination — we handle it all.' },
  ]

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: EMERALD }}>
            Why Choose Us
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight max-w-2xl mx-auto" style={{ color: NAVY }}>
            What makes Urjaa Solar different.
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto">
            Six commitments we make on every project — residential, commercial and industrial.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="rounded-xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div
                className="h-11 w-11 rounded-lg flex items-center justify-center mb-4 text-white"
                style={{ background: `linear-gradient(135deg, ${NAVY}, #1e3a5f)` }}
              >
                {it.icon}
              </div>
              <h3 className="font-semibold text-base mb-2" style={{ color: NAVY }}>{it.t}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{it.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Band ─────────────────────────────────────────────────────────────────
function CTABand() {
  return (
    <section className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-[11px] font-semibold tracking-wide uppercase mb-2" style={{ color: EMERALD }}>Get Started Today</div>
            <h3 className="font-display text-2xl md:text-3xl font-bold" style={{ color: NAVY }}>
              Ready to explore solar for your property?
            </h3>
            <p className="text-slate-500 text-sm mt-1.5">Book a free site survey. We&apos;ll evaluate feasibility and share a formal proposal.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a href={`tel:${SITE.phoneDial}`}>
              <Button className="h-12 px-7 text-sm font-medium text-white" style={{ background: NAVY }}>
                <PhoneCall className="h-4 w-4 mr-2" /> Call {SITE.phone}
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline" className="h-12 px-7 text-sm font-medium border-slate-300 text-slate-700 hover:border-slate-400">
                Request a Callback
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xs text-slate-400 mt-6 text-center"
        >
          We&apos;ll call within 24 hours &bull; No obligation &bull; Free consultation
        </motion.p>
      </div>
    </section>
  )
}

// ─── Home Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="bg-white">
      <Toaster position="top-center" richColors />
      <Nav transparentOnTop />
      <CinematicSolarHero />
      <WhyChooseUs />
      <Services />
      <ComponentQualitySection />
      <InstallTimeline />
      <TrustStats />
      <ValueProps />
      <CredentialsMarquee />
      <TrustScore />
      <Testimonials />
      <CalculatorSection />
      <Subsidy />
      <CTABand />
      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
