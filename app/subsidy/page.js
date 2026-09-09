import Link from 'next/link'
import { Toaster } from 'sonner'
import { CheckCircle2, ExternalLink, AlertCircle, ChevronRight, IndianRupee, Building2, FileCheck } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import PageHeader from '@/components/site/PageHeader'
import { Button } from '@/components/ui/button'
import { SITE } from '@/lib/site-config'

export const metadata = {
  title: `PM Surya Ghar Solar Subsidy | ${SITE.name}`,
  description: 'Information about PM Surya Ghar Muft Bijli Yojana government subsidy for rooftop solar in India. Eligibility, benefit structure, and how Urjaa Solar Energy assists with the application.',
}

const BENEFIT_SLABS = [
  { slab: 'System capacity up to 1 kW', benefit: '₹30,000', note: '₹30,000 per kW' },
  { slab: 'System capacity 1 kW to 2 kW', benefit: '₹60,000', note: '₹30,000 per additional kW' },
  { slab: 'System capacity above 2 kW', benefit: 'Up to ₹78,000', note: 'Maximum Central Financial Assistance' },
]

const ELIGIBILITY = [
  'Indian resident with a valid domestic electricity connection from a licensed DISCOM',
  'Owns or has authorised access (NOC) to a rooftop with adequate shadow-free area',
  'Registered on the national portal at pmsuryaghar.gov.in',
  'Installation done by a vendor empanelled on the national portal',
  'Applies to residential (domestic) consumers only — commercial and industrial are not eligible under this scheme',
]

const HOW_TO_APPLY = [
  { n: '01', t: 'Register on the portal', d: 'Create an account at pmsuryaghar.gov.in using your electricity consumer number.' },
  { n: '02', t: 'Apply for rooftop solar', d: 'Fill the application, select your DISCOM and submit for technical feasibility.' },
  { n: '03', t: 'DISCOM approval', d: 'Your DISCOM reviews the application and approves technical feasibility for installation.' },
  { n: '04', t: 'Installation by empanelled vendor', d: 'Get the system installed by an approved vendor — we assist with the process.' },
  { n: '05', t: 'Net meter application', d: 'Submit net meter installation request to DISCOM via the portal.' },
  { n: '06', t: 'Commissioning report', d: 'Upload commissioning certificate and installation report to the portal.' },
  { n: '07', t: 'Subsidy disbursement', d: 'Post-verification, the subsidy amount is credited directly to your bank account.' },
]

export default function SubsidyPage() {
  return (
    <main className="bg-white">
      <Toaster position="top-center" richColors />
      <Nav />
      <PageHeader
        eyebrow="Government Subsidy"
        title="PM Surya Ghar Muft Bijli Yojana."
        sub="Central Financial Assistance for residential rooftop solar. We help eligible customers navigate the registration, documentation and DISCOM coordination process."
      />

      {/* Benefit table */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#16a34a] mb-3">Central Financial Assistance</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f2447]">Subsidy structure</h2>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Under PM Surya Ghar Muft Bijli Yojana, eligible residential consumers receive a direct subsidy credited to their bank account after system commissioning and DISCOM verification.
            </p>
            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500">System Capacity</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Subsidy Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {BENEFIT_SLABS.map((r, i) => (
                    <tr key={i} className={i === BENEFIT_SLABS.length - 1 ? 'bg-[#f0fdf4]' : ''}>
                      <td className="px-4 py-3.5 text-slate-700">{r.slab}</td>
                      <td className="px-4 py-3.5">
                        <span className={`font-semibold ${i === BENEFIT_SLABS.length - 1 ? 'text-[#16a34a]' : 'text-[#0f2447]'}`}>{r.benefit}</span>
                        <span className="text-xs text-slate-400 ml-2">({r.note})</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-start gap-2.5 p-4 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
              <span>
                <strong>Disclaimer:</strong> Subsidy amounts, eligibility criteria and scheme guidelines are set by the Government of India and are subject to change without notice. Always verify the current terms on the official portal. Information last checked: August 2025.
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#16a34a] mb-3">Who is eligible</div>
            <h2 className="font-display text-2xl font-bold text-[#0f2447]">Eligibility criteria</h2>
            <ul className="mt-4 space-y-3">
              {ELIGIBILITY.map((e, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 text-[#16a34a] shrink-0 mt-0.5" />
                  {e}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-5 border-t border-slate-200 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-md bg-slate-100 text-[#0f2447] flex items-center justify-center shrink-0">
                  <IndianRupee className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Commercial & Industrial</div>
                  <div className="text-sm text-slate-700 mt-0.5">Not eligible for PM Surya Ghar CFA. May claim accelerated depreciation under Income Tax Act.</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-md bg-slate-100 text-[#0f2447] flex items-center justify-center shrink-0">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Housing Societies</div>
                  <div className="text-sm text-slate-700 mt-0.5">Separate scheme provisions exist for group housing. Ask us about RWA / society installations.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to apply */}
      <section className="py-14 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#16a34a] mb-3">Application Process</div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#0f2447] max-w-xl">How to apply for PM Surya Ghar subsidy.</h2>
          <p className="mt-3 text-slate-600 text-sm">Urjaa Solar assists with steps 2 through 6.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {HOW_TO_APPLY.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="font-display text-3xl font-bold text-slate-100 leading-none mb-2 select-none">{s.n}</div>
                <h3 className="font-semibold text-[#0f2447] text-sm">{s.t}</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official source + CTA */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid md:grid-cols-2 gap-8">
          <div className="rounded-xl border border-slate-200 p-6 bg-slate-50">
            <div className="flex items-center gap-2.5 mb-3">
              <FileCheck className="h-5 w-5 text-[#16a34a]" />
              <div className="font-semibold text-[#0f2447]">Official Government Portal</div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              All subsidy applications must be submitted and tracked on the official national portal. We do not charge any fee for subsidy assistance.
            </p>
            <a href="https://pmsuryaghar.gov.in" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[#0f2447] hover:underline">
              pmsuryaghar.gov.in <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="rounded-xl border border-slate-200 p-6 bg-[#0f2447] text-white">
            <h3 className="font-display text-xl font-semibold">We guide you through the entire process.</h3>
            <p className="text-white/70 text-sm mt-2 leading-relaxed">
              From portal registration to DISCOM coordination, we handle the documentation so you can focus on enjoying the savings.
            </p>
            <Link href="/contact">
              <Button className="mt-5 h-10 px-5 bg-white text-[#0f2447] hover:bg-slate-100 font-medium text-sm">
                Check My Eligibility <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-8">
          <p className="text-xs text-slate-400 border-t border-slate-100 pt-6 leading-relaxed">
            <strong>Important disclaimer:</strong> Urjaa Solar Energy is not an official government entity. The subsidy information on this page is provided for general awareness based on publicly available government sources. Actual eligibility, subsidy amounts and processing timelines are determined solely by the relevant government authorities. Always refer to the official PM Surya Ghar portal and your local DISCOM for authoritative information. Urjaa Solar Energy makes no guarantee of subsidy approval.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
