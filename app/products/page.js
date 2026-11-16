import Link from 'next/link'
import { Toaster } from 'sonner'
import { Sun, Zap, Battery, Settings, Droplets, Activity, Shield, ChevronRight } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import PageHeader from '@/components/site/PageHeader'
import LiveProducts from '@/components/site/LiveProducts'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site-config'

export const metadata = {
  title: `Solar Products | ${SITE.name}`,
  description: 'Solar panels, inverters, hybrid inverters, batteries, structures and BOS components used by Urjaa Solar Energy for residential, commercial and industrial installations.',
}

const CATEGORIES = [
  {
    id: 'solar-panels', label: 'Solar Panels', icon: Sun, range: '150 W – 600 W',
    desc: 'Monocrystalline, polycrystalline and bifacial panels from Tier-1 manufacturers. We use only MNRE-approved panels with manufacturer performance warranty.',
    brands: ['Waaree', 'Adani Solar', 'Vikram Solar', 'Goldi Solar', 'Tata Power Solar'],
  },
  {
    id: 'inverters', label: 'On-Grid Inverters', icon: Zap, range: '1 kW – 100 kW',
    desc: 'String inverters for grid-tied systems with anti-islanding protection as required by CEA regulations and DISCOM standards.',
    brands: ['Growatt', 'Fronius', 'SMA', 'Delta', 'Sungrow'],
  },
  {
    id: 'hybrid-inverters', label: 'Hybrid Inverters', icon: Battery, range: '3 kW – 20 kW',
    desc: 'Combined solar and battery inverters for systems with backup power. Suitable for areas with frequent outages and users who want energy independence.',
    brands: ['Growatt', 'Deye', 'Luminous', 'Su-Kam'],
  },
  {
    id: 'batteries', label: 'Battery Storage', icon: Battery, range: '2.4 kWh – 20 kWh',
    desc: 'Lithium iron phosphate (LFP) and VRLA battery banks for hybrid and off-grid systems. BMS-integrated for safety and cycle life.',
    brands: ['Luminous', 'Livguard', 'Okaya', 'Amara Raja'],
  },
  {
    id: 'structures', label: 'Solar Structures', icon: Settings, range: 'Custom fabricated',
    desc: 'Hot-dip galvanised steel and aluminium mounting structures designed to IS 875 wind load standards for RCC, metal-sheet and flat roof variants.',
    brands: ['Custom fabricated', 'IS 4923 compliant'],
  },
  {
    id: 'solar-pumps', label: 'Solar Pumps', icon: Droplets, range: '1 HP – 10 HP',
    desc: 'DC and AC solar submersible and surface pumps for agriculture, irrigation and water supply applications.',
    brands: ['Kirloskar', 'KSB', 'Shakti', 'CRI'],
  },
  {
    id: 'monitoring', label: 'Monitoring Systems', icon: Activity, range: 'Cloud + App',
    desc: 'Generation monitoring via Wi-Fi or GPRS data loggers. Compatible with most inverter brands. Remote access via mobile app and web dashboard.',
    brands: ['Growatt ShinePhone', 'SolarEdge', 'Custom SCADA'],
  },
  {
    id: 'bos', label: 'BOS & Safety Equipment', icon: Shield, range: '',
    desc: 'DCDB, ACDB, surge protection, MC4 connectors, DC cables, earthing kits and safety equipment as per MNRE and CEA guidelines.',
    brands: ['Elmec', 'L&T', 'Havells', 'Finolex'],
  },
]

export default function ProductsPage() {
  return (
    <main className="bg-white">
      <Toaster position="top-center" richColors />
      <Nav />
      <PageHeader
        eyebrow="Solar Products"
        title="Components we trust for every installation."
        sub="We specify, procure and install equipment from proven manufacturers with strong warranty support in India. Every component is selected to match the site requirements confirmed during the survey."
      />

      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <div key={cat.id} className="rounded-xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="h-10 w-10 rounded-md bg-slate-100 text-[#0f2447] flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    {cat.range && (
                      <span className="text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded-full whitespace-nowrap">
                        {cat.range}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-[#0f2447] text-lg">{cat.label}</h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{cat.desc}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Brands we work with</div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.brands.map(b => (
                        <span key={b} className="text-xs text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <div className="md:flex items-center justify-between gap-8">
              <div>
                <h3 className="font-display text-xl font-semibold text-[#0f2447]">Specific brands and models are confirmed after site survey.</h3>
                <p className="text-sm text-slate-600 mt-2 max-w-2xl">
                  The right equipment depends on your roof type, load profile, state DISCOM requirements and budget. We prepare a detailed Bill of Quantities (BOQ) with exact model numbers, warranty terms and current pricing as part of the quotation — after the free site visit.
                </p>
              </div>
              <div className="mt-5 md:mt-0 shrink-0">
                <Link href="/contact">
                  <Button className="bg-[#0f2447] hover:bg-[#0a1a34] text-white h-11 px-6 whitespace-nowrap">
                    Request Site Survey <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LiveProducts />

      <section className="py-14 bg-[#0f2447]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white">Every component is MNRE-approved.</h3>
          <p className="text-white/70 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            For PM Surya Ghar subsidy eligibility, we use only panels and inverters from the MNRE approved list. We share documentation of all components with the customer at handover.
          </p>
          <a href={SITE.whatsappMsg('Hi Urjaa Solar Energy, I would like to know more about the components you use.')} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 h-11 rounded-md bg-white text-[#0f2447] font-medium text-sm hover:bg-slate-100 transition-colors">
            Ask us on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
