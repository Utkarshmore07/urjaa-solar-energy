import Link from 'next/link'
import { Phone, Mail, MapPin, MessageCircle, FileText } from 'lucide-react'
import Logo from './Logo'
import { SITE } from '@/lib/site-config'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#0a1a34] text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Logo light />
            <p className="text-sm mt-5 max-w-sm leading-relaxed text-slate-400">
              Rooftop solar installation, engineering and after-sales service for homes, businesses and industries. Founded by {SITE.founder} in {SITE.established}.
            </p>
            <div className="mt-6 space-y-2.5 text-sm">
              <a href={`tel:${SITE.phoneDial}`} className="flex items-center gap-2.5 hover:text-white"><Phone className="h-4 w-4" /> {SITE.phone}</a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2.5 hover:text-white"><Mail className="h-4 w-4" /> {SITE.email}</a>
              <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 hover:text-white"><MessageCircle className="h-4 w-4" /> WhatsApp Chat</a>
              <div className="flex items-start gap-2.5 pt-1 text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="text-xs leading-relaxed">{SITE.address.line1}, {SITE.address.line2}, {SITE.address.district}, {SITE.address.state} - {SITE.address.pin}</span>
              </div>
            </div>
          </div>
          {[
            { t: 'Solutions', l: [
              { n: 'Residential Solar', h: '/services/residential' },
              { n: 'Commercial Solar', h: '/services/commercial' },
              { n: 'Industrial Solar', h: '/services/industrial' },
              { n: 'Hybrid Solar', h: '/services/hybrid-solar-system' },
              { n: 'Solar Products', h: '/products' },
            ] },
            { t: 'Company', l: [
              { n: 'About Us', h: '/about' },
              { n: 'Projects', h: '/projects' },
              { n: 'Solar Journal', h: '/blog' },
              { n: 'FAQ', h: '/faq' },
              { n: 'Contact', h: '/contact' },
            ] },
            { t: 'Support', l: [
              { n: 'Book Consultation', h: '/contact' },
              { n: 'Govt. Subsidy Guide', h: '/subsidy' },
              { n: 'Solar Calculator', h: '/#calculator' },
              { n: 'Live Load Calculator', h: '/load-calculator' },
              { n: 'Customer Portal', h: '/customer/login' },
              { n: 'WhatsApp Us', h: SITE.whatsapp, ext: true },
            ] },
          ].map((c, i) => (
            <div key={i}>
              <div className="text-xs uppercase tracking-widest text-white font-semibold mb-4">{c.t}</div>
              <ul className="space-y-2.5 text-sm">
                {c.l.map(x => (
                  <li key={x.n}>
                    {x.ext ? (
                      <a href={x.h} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{x.n}</a>
                    ) : (
                      <Link href={x.h} className="hover:text-white transition-colors">{x.n}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 grid md:grid-cols-2 gap-4 text-xs text-slate-500">
          <div className="space-y-1">
            <div>© {year} {SITE.legalName}. All rights reserved.</div>
            <div className="flex items-center gap-1.5"><FileText className="h-3 w-3" /> GSTIN: <span className="font-mono text-slate-400">{SITE.gstin}</span></div>
            <div>Proprietor: {SITE.founderFullName}</div>
          </div>
          <div className="flex md:justify-end items-start gap-5">
            <span>Est. {SITE.established}</span>
            <Link href="/faq" className="hover:text-white">FAQ</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/admin/login" className="hover:text-white opacity-60">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
