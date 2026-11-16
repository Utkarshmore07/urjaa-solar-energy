import { Toaster } from 'sonner'
import Link from 'next/link'
import { ArrowRight, MapPin, Calendar, Zap } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import PageHeader from '@/components/site/PageHeader'
import { Button } from '@/components/ui/button'
import { SITE, PROJECTS } from '@/lib/site-config'

export const metadata = {
  title: `Projects | ${SITE.name}`,
  description: `Completed solar installation projects by ${SITE.name} across Uttar Pradesh.`,
}

export default function Projects() {
  return (
    <main className="bg-white">
      <Toaster position="top-center" richColors />
      <Nav />
      <PageHeader
        eyebrow="Projects"
        title="Our project portfolio."
        sub={`Real installations completed by the Urjaa Solar team across Uttar Pradesh. Each project includes site survey, system design, installation, and commissioning — end-to-end.`}
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">

          {/* Filter pills (static for now) */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['All', 'Residential', 'Commercial', 'Industrial', 'Solar Mill'].map((c, i) => (
              <button
                key={i}
                className={`px-4 py-2 text-xs font-semibold rounded-full border ${i === 0 ? 'bg-[#0f2447] text-white border-[#0f2447]' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((p, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-slate-200 bg-white group hover:border-slate-300 hover:shadow-md transition-all">
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#16a34a] font-semibold">{p.type}</span>
                    <span className="text-[10px] text-slate-400">{p.year}</span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-[#0f2447]">{p.title}</h3>
                  <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-amber-500" />
                      <span className="font-medium">{p.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {p.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <h3 className="font-display text-xl font-semibold text-[#0f2447]">Want a reference call with a past customer?</h3>
            <p className="text-slate-600 mt-2 text-sm max-w-2xl">We&apos;ll gladly arrange a call with one of our existing customers in your area so you can hear directly about their experience with Urjaa Solar.</p>
            <Link href="/contact" className="inline-block mt-4">
              <Button className="bg-[#0f2447] hover:bg-[#0a1a34] text-white h-11 px-5">
                Request a reference <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
