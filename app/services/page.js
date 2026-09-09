'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Toaster } from 'sonner'
import { ArrowRight } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import PageHeader from '@/components/site/PageHeader'
import { SERVICES, SITE } from '@/lib/site-config'

export default function ServicesIndex() {
  return (
    <main className="bg-white">
      <Toaster position="top-center" richColors />
      <Nav />
      <PageHeader eyebrow="Solar Services" title="Solar solutions engineered for India." sub="We design and install solar systems for homes, shops, factories, atta chakkis, cold storage and hybrid setups. Explore each category to understand our approach." />

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((it, i) => (
            <motion.div key={it.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}>
              <Link href={`/services/${it.slug}`} className="group rounded-xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all block h-full">
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img src={it.img} alt={it.label} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{it.range}</div>
                  <h3 className="font-semibold text-lg text-[#0f2447] mt-1">{it.label}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{it.desc}</p>
                  <div className="mt-5 text-sm font-medium text-[#0f2447] group-hover:underline inline-flex items-center gap-1">Read more <ArrowRight className="h-4 w-4" /></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
