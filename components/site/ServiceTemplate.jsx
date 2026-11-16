'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Toaster } from 'sonner'
import { CheckCircle2, ArrowRight, MessageCircle, PhoneCall, Sun } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import PageHeader from '@/components/site/PageHeader'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site-config'

export default function ServiceTemplate({ service, longDesc, includes, sizes, benefits, extra }) {
  const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }
  return (
    <main className="bg-white">
      <Toaster position="top-center" richColors />
      <Nav />
      <PageHeader eyebrow={service.label} title={service.headline || `${service.label} for Indian sites.`} sub={longDesc} />

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <motion.div {...fade} className="rounded-xl overflow-hidden border border-slate-200">
            <img src={service.img} alt={service.label} className="w-full aspect-[4/3] object-cover" />
          </motion.div>
          <motion.div {...fade} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700"><Sun className="h-3.5 w-3.5 text-amber-500" /> {service.range}</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f2447]">{service.includesTitle || "What's included"}</h2>
            <ul className="space-y-2.5 text-slate-700">
              {includes.map(x => (
                <li key={x} className="flex gap-2 text-sm leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-[#16a34a] shrink-0 mt-0.5" /> {x}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {benefits && (
        <section className="py-14 bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#16a34a] mb-3">Why {service.label}</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f2447] max-w-2xl">Real, measurable benefits.</h2>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {benefits.map((b, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="h-9 w-9 rounded-md bg-slate-100 text-[#0f2447] flex items-center justify-center">{b.icon}</div>
                  <h3 className="font-semibold text-[#0f2447] mt-3">{b.t}</h3>
                  <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">{b.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sizes && (
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#16a34a] mb-3">Typical Systems</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f2447] max-w-2xl">Common use cases.</h2>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {sizes.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="rounded-xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-sm transition-all">
                  <div className="font-display text-2xl font-bold text-[#0f2447]">{c.s}</div>
                  <div className="text-sm text-slate-600 mt-2">{c.u}</div>
                  <div className="text-xs text-slate-500 mt-2">{c.a}</div>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">Actual system size confirmed after physical site survey.</p>
          </div>
        </section>
      )}

      {extra}

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-[#0f2447]">Interested in {service.label}?</h3>
            <p className="text-slate-600 mt-2">Book a free site visit. We&apos;ll assess feasibility and share a formal quotation.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
            <a href={`tel:${SITE.phoneDial}`}><Button className="h-12 px-6 bg-[#0f2447] hover:bg-[#0a1a34] text-white font-medium w-full sm:w-auto"><PhoneCall className="h-4 w-4 mr-2" /> Call {SITE.phone}</Button></a>
            <a href={SITE.whatsappMsg(`Hi Urjaa Solar, I want a quote for ${service.label}.`)} target="_blank" rel="noreferrer">
              <Button variant="outline" className="h-12 px-6 border-slate-300 font-medium w-full sm:w-auto"><MessageCircle className="h-4 w-4 mr-2" /> WhatsApp Us</Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
