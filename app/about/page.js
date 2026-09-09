import Link from 'next/link'
import { Toaster } from 'sonner'
import { CheckCircle2, User, Calendar, Building2, ShieldCheck, Wrench, Handshake, Eye } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import PageHeader from '@/components/site/PageHeader'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site-config'

export const metadata = {
  title: `About | ${SITE.name}`,
  description: `Learn about ${SITE.name}, founded by ${SITE.founder} in ${SITE.established}. We design and install rooftop solar systems across India.`,
}

export default function AboutPage() {
  return (
    <main className="bg-white">
      <Toaster position="top-center" richColors />
      <Nav />
      <PageHeader eyebrow="About Us" title={`Building India's next-generation solar company.`} sub={`${SITE.name} was founded by ${SITE.founder} in ${SITE.established} with a simple mission: make rooftop solar a straightforward, honest and reliable experience for every Indian household and business.`} />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6 text-slate-700 leading-relaxed">
            <p>Solar has enormous potential in India, but customers often get confused between too many brands, unclear pricing and after-sales gaps. We started {SITE.name} to solve exactly this — by being honest about what a system will actually generate, transparent about pricing, and disciplined about service after installation.</p>
            <p>We are engineering-first. Every quotation is preceded by a site survey. Every design is based on the customer's actual electricity bill and roof geometry. And every installation is executed by trained technicians using MNRE-approved components.</p>
            <p>As a young company (founded in {SITE.established}), we don't claim decades of history — we compete on quality, transparency and service. Our founder personally reviews every project handover in this early phase.</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-6 bg-slate-50">
            <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Founder</div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-[#0f2447] text-white flex items-center justify-center font-semibold text-lg">AJ</div>
              <div>
                <div className="font-display font-semibold text-[#0f2447] text-lg">{SITE.founder}</div>
                <div className="text-sm text-slate-600">{SITE.founderTitle}, {SITE.name}</div>
              </div>
            </div>
            <div className="mt-6 space-y-2.5 text-sm text-slate-700">
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#16a34a]" /> Established {SITE.established}</div>
              <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-[#16a34a]" /> {SITE.legalName}</div>
              <div className="flex items-center gap-2"><User className="h-4 w-4 text-[#16a34a]" /> {SITE.constitution}</div>
            </div>
            <div className="mt-5 pt-5 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-1">Legal & Registration</div>
              <div><span className="text-slate-500">GSTIN:</span> <span className="font-mono text-slate-800">{SITE.gstin}</span></div>
              <div><span className="text-slate-500">Proprietor:</span> <span className="text-slate-800">{SITE.founderFullName}</span></div>
              <div><span className="text-slate-500">Registered Office:</span> <span className="text-slate-800">{SITE.address.line1}, {SITE.address.line2}, {SITE.address.district}, {SITE.address.state} - {SITE.address.pin}</span></div>
            </div>
            <Link href="/contact" className="mt-6 inline-block">
              <Button className="bg-[#0f2447] hover:bg-[#0a1a34] text-white h-10 px-5 text-sm">Talk to us</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#16a34a] mb-3">What we stand for</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0f2447] max-w-2xl tracking-tight">Four principles that guide every project.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {[
              { i: <Eye className="h-5 w-5" />, t: 'Transparency', d: "Written BOQs, brand-wise pricing, real generation estimates. If we don't know something, we say so." },
              { i: <ShieldCheck className="h-5 w-5" />, t: 'Quality', d: 'Only Tier-1 panels and MNRE-approved inverters. IS-compliant structures. No shortcuts on safety.' },
              { i: <Wrench className="h-5 w-5" />, t: 'Engineering-first', d: 'Site survey before quote. Shadow analysis. Structural check. Design tailored to actual site conditions.' },
              { i: <Handshake className="h-5 w-5" />, t: 'Accountability', d: 'One point of contact. Warranty documentation handed over. Free service visits within the first year.' },
            ].map((v, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="h-10 w-10 rounded-md bg-slate-100 text-[#0f2447] flex items-center justify-center">{v.i}</div>
                <h3 className="font-semibold text-[#0f2447] mt-4">{v.t}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-display text-2xl font-bold text-[#0f2447] mb-3">Our mission</h3>
            <p className="text-slate-700 leading-relaxed">To make rooftop solar the default choice for Indian households and businesses by removing complexity, hidden costs and after-sales anxiety from the process.</p>
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-[#0f2447] mb-3">Our promise</h3>
            <ul className="space-y-2.5 text-slate-700 text-sm">
              {['Written estimate before any commitment','No hidden charges after signing','MNRE-approved components only','Post-installation service visits','Assistance with subsidy paperwork'].map(x => (
                <li key={x} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-[#16a34a] shrink-0 mt-0.5" /> {x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
