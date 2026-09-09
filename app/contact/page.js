import { Toaster } from 'sonner'
import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import PageHeader from '@/components/site/PageHeader'
import ContactForm from '@/components/site/ContactForm'
import { SITE } from '@/lib/site-config'

export const metadata = { title: `Contact | ${SITE.name}`, description: 'Contact Urjaa Solar Energy for a free site survey.' }

export default function ContactPage() {
  const items = [
    { i: <Phone className="h-4 w-4" />, k: 'Call', v: SITE.phone, href: `tel:${SITE.phoneDial}` },
    { i: <MessageCircle className="h-4 w-4" />, k: 'WhatsApp', v: SITE.phone, href: SITE.whatsappMsg('Hi Urjaa Solar Energy, I want to know more about rooftop solar.'), ext: true },
    { i: <Mail className="h-4 w-4" />, k: 'Email', v: SITE.email, href: `mailto:${SITE.email}` },
    { i: <MapPin className="h-4 w-4" />, k: 'Serving', v: 'Pan-India (physical survey on request)' },
    { i: <Clock className="h-4 w-4" />, k: 'Hours', v: 'Mon – Sat, 10:00 AM – 7:00 PM IST' },
  ]
  return (
    <main className="bg-white">
      <Toaster position="top-center" richColors />
      <Nav />
      <PageHeader eyebrow="Contact" title="Talk to a real solar engineer." sub="Whether you want a free consultation, a formal quotation or just have a technical question — reach out. We respond during business hours and never share your details with third parties." />
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#0f2447]">Reach us directly</h2>
            <div className="mt-6 space-y-4">
              {items.map((c, i) => {
                const inner = (
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-md bg-slate-100 text-[#0f2447] flex items-center justify-center shrink-0">{c.i}</div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">{c.k}</div>
                      <div className="text-sm font-medium text-[#0f2447] mt-0.5">{c.v}</div>
                    </div>
                  </div>
                )
                return c.href ? (
                  <a key={i} href={c.href} target={c.ext ? '_blank' : undefined} rel={c.ext ? 'noreferrer' : undefined} className="block hover:opacity-80 transition-opacity">{inner}</a>
                ) : <div key={i}>{inner}</div>
              })}
            </div>
            <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Prefer WhatsApp?</div>
              <p className="text-sm text-slate-700 mt-2">Tap the button below to start a conversation directly on WhatsApp. Please include your city and monthly bill so we can respond faster.</p>
              <a href={SITE.whatsappMsg('Hi Urjaa Solar Energy, I would like a quote.')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 px-5 h-11 rounded-md bg-[#25D366] text-white font-medium"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
            </div>
          </div>
          <div>
            <div className="rounded-xl border border-slate-200 p-6 lg:p-8 bg-white">
              <h2 className="font-display text-2xl font-bold text-[#0f2447]">Request a callback</h2>
              <p className="text-sm text-slate-600 mt-1">Fill the form and our team will reach out within 24 business hours.</p>
              <div className="mt-6"><ContactForm /></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
