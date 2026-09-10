import Link from 'next/link'
import { ArrowRight, CheckCircle2, ExternalLink, Eye, FileCheck2, Gauge, Handshake, Leaf, MapPin, ShieldCheck, Target, Wrench } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site-config'

export const metadata = {
  title: `Vision & Mission | ${SITE.name}`,
  description: `Read the vision, mission and operating principles of ${SITE.name}: practical engineering, transparent solar proposals and dependable service for Indian homes and businesses.`,
}

const PRINCIPLES = [
  { icon: <Eye className="h-5 w-5" />, title: 'Evidence before promise', text: 'We begin with the electricity bill, roof geometry and site conditions. A proposal should explain what a system can reasonably deliver, not just sound optimistic.' },
  { icon: <Gauge className="h-5 w-5" />, title: 'Designed for the actual site', text: 'System sizing, shadow analysis, structural checks and protection are part of the engineering conversation before installation begins.' },
  { icon: <FileCheck2 className="h-5 w-5" />, title: 'Everything in writing', text: 'Customers should receive a clear scope, component details, warranty information and handover documentation they can keep and understand.' },
  { icon: <Handshake className="h-5 w-5" />, title: 'Accountability after commissioning', text: 'The relationship does not end when the meter starts running. We remain available for service coordination, warranty handover and practical guidance.' },
]

const FACTS = [
  { value: String(SITE.established), label: 'Established', detail: 'A young company with a long-term view' },
  { value: 'UP', label: 'Base of operations', detail: 'Serving customers from Uttar Pradesh' },
  { value: 'GST', label: 'Registered business', detail: SITE.gstin },
  { value: '1:1', label: 'Project ownership', detail: 'A direct point of contact through delivery' },
]

export default function VisionMissionPage() {
  return (
    <main className="bg-white text-slate-800">
      <Nav />

      <section className="relative overflow-hidden bg-[#0a1a34] pt-32 text-white">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute -right-24 -top-28 h-[30rem] w-[30rem] rounded-full border border-emerald-300/60" />
          <div className="absolute right-8 top-10 h-[20rem] w-[20rem] rounded-full border border-amber-300/40" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a1a34] to-transparent" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:px-8 lg:pb-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-300">
              <Leaf className="h-3.5 w-3.5" /> Our direction
            </div>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
              A more dependable solar future, built one site at a time<span className="text-amber-400">.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              {SITE.name} exists to make rooftop solar easier to understand, easier to adopt and easier to live with for Indian homes, businesses and institutions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact">
                <Button className="h-12 bg-emerald-500 px-6 text-sm font-semibold text-white hover:bg-emerald-400">
                  Start a conversation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about" className="inline-flex h-12 items-center justify-center px-5 text-sm font-medium text-slate-200 transition-colors hover:text-white">
                Read about the company
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?crop=entropy&cs=srgb&fm=jpg&q=85"
              alt="Solar panels installed on a rooftop under clear daylight"
              className="h-72 w-full object-cover opacity-90 lg:h-[25rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a34]/90 via-[#0a1a34]/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Site-first thinking
              </div>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/85">Solar is not a one-size-fits-all product. The right answer starts with the place, the people and the load.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-200 px-5 md:grid-cols-4 md:divide-y-0 lg:px-8">
          {FACTS.map((fact) => (
            <div key={fact.label} className="px-4 py-7 first:pl-0 md:px-6 lg:py-9">
              <div className="font-display text-2xl font-bold text-[#0f2447]">{fact.value}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-600">{fact.label}</div>
              <div className="mt-2 text-xs leading-relaxed text-slate-500">{fact.detail}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-600">The mission</div>
            <h2 className="mt-4 max-w-md font-display text-3xl font-bold leading-tight text-[#0f2447] md:text-4xl">Make good solar decisions feel straightforward.</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-600">Our mission is to remove avoidable uncertainty from rooftop solar: unclear sizing, unexplained pricing, weak documentation and silence after installation.</p>
            <div className="mt-7 border-l-2 border-amber-400 pl-5 text-sm font-medium leading-relaxed text-[#0f2447]">We want every customer to know what they are buying, why it fits their site and who will answer when they need help.</div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((principle, index) => (
              <article key={principle.title} className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-xl">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0f2447] text-white shadow-lg shadow-[#0f2447]/15 transition-transform group-hover:scale-105">{principle.icon}</div>
                  <span className="font-display text-3xl font-bold text-slate-200">0{index + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-lg font-bold text-[#0f2447]">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-[#f3f7f6] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-600">The vision</div>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-[#0f2447] md:text-5xl">A distributed energy future that earns trust.</h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600">We see a future where more Indian households and enterprises can produce clean electricity on their own roofs, reduce exposure to rising power costs and make energy choices with confidence.</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">That future is not created by a slogan. It is created through accurate site assessments, competent installation, transparent economics and service that continues after commissioning.</p>
          </div>
          <div className="rounded-2xl border border-[#0f2447]/10 bg-[#0f2447] p-7 text-white shadow-xl lg:p-8">
            <Target className="h-7 w-7 text-amber-400" />
            <h3 className="mt-5 font-display text-2xl font-bold">What this means in practice</h3>
            <ul className="mt-6 space-y-4 text-sm leading-relaxed text-slate-300">
              {['Recommend a system only after understanding the site and consumption pattern.', 'Show the assumptions behind generation, savings and payback estimates.', 'Use written scopes and handover records so the customer has a durable reference.', 'Build local capability for installation, service and customer support.'].map((item) => (
                <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><ShieldCheck className="h-5 w-5" /></div>
              <div>
                <h2 className="font-display text-xl font-bold text-[#0f2447]">Trust should be easy to verify.</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">Company details shown here come from {SITE.name}&apos;s own business records. Government scheme rules, approvals and subsidy decisions are controlled by the relevant authorities.</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-emerald-600" /> {SITE.address.district}, {SITE.address.state}</span>
                  <span className="inline-flex items-center gap-1.5"><Wrench className="h-3.5 w-3.5 text-emerald-600" /> Engineering-led delivery</span>
                </div>
              </div>
            </div>
            <a href="https://pmsuryaghar.gov.in" target="_blank" rel="noreferrer" className="mt-6 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#0f2447] hover:text-emerald-600 md:mt-0">Verify scheme information <ExternalLink className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </main>
  )
}