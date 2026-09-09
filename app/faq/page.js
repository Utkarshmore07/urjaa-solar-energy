import { Toaster } from 'sonner'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import PageHeader from '@/components/site/PageHeader'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SITE } from '@/lib/site-config'

export const metadata = { title: `FAQ | ${SITE.name}`, description: 'Frequently asked questions about rooftop solar in India.' }

export default function FAQPage() {
  const groups = [
    {
      title: 'General',
      items: [
        { q: 'What does Urjaa Solar Energy do?', a: `Urjaa Solar Energy designs, installs and services rooftop solar systems for residential, commercial and industrial customers. We handle the entire journey — from site survey to net-metering approval.` },
        { q: 'Where do you operate?', a: 'We serve customers pan-India and travel to the site for physical survey. Please reach out via phone or WhatsApp with your location for feasibility.' },
        { q: 'Are you an MNRE-approved vendor?', a: 'We follow MNRE guidelines and use MNRE-approved components. For PM Surya Ghar subsidy, empanelment status is verified on a project-by-project basis with the local DISCOM.' },
      ],
    },
    {
      title: 'Cost & Subsidy',
      items: [
        { q: 'What is the cost of a rooftop solar system?', a: 'Cost depends on system size, panel and inverter brand, structure type and site conditions. For residential systems, indicative pricing is generally in the range of INR 55,000 – 75,000 per kW before subsidy. A firm price is shared after site survey.' },
        { q: 'What subsidy is available?', a: 'Under PM Surya Ghar Yojana, residential customers may receive up to INR 78,000 in central financial assistance. Commercial and industrial customers are generally not eligible for this specific subsidy but may claim accelerated depreciation benefits.' },
        { q: 'Do you offer EMI options?', a: 'Yes, several public and private banks offer solar loans for residential and commercial systems. Terms depend on the bank; we can help share the current partner options during your consultation.' },
      ],
    },
    {
      title: 'Installation',
      items: [
        { q: 'How long does installation take?', a: 'For a typical residential system, physical installation is 3–7 days. End-to-end (site survey to net-metering) usually takes 3–6 weeks, depending on DISCOM timelines.' },
        { q: 'Will my roof be suitable?', a: 'Most RCC, metal sheet and tile roofs are suitable. We check shadow-free area, orientation, structural fitness and access during the site survey.' },
        { q: 'What happens at night or on cloudy days?', a: 'On-grid systems draw from the grid at night. During the day, surplus generation is exported and adjusted through net-metering. Battery backup can be added for hybrid systems (extra cost).' },
      ],
    },
    {
      title: 'Warranty & Service',
      items: [
        { q: 'What warranty do I get?', a: 'Solar panels carry manufacturer warranty (commonly 10-year product / 25-year performance). Inverters typically carry 5–10 year warranty. Installation workmanship is warranted by us for 1 year. Exact durations are stated on the invoice.' },
        { q: 'Do you provide after-sales service?', a: 'Yes. We provide free service visits within the first year and offer AMC contracts thereafter. Warranty claims for panels / inverter are coordinated with the respective manufacturer.' },
      ],
    },
  ]
  return (
    <main className="bg-white">
      <Toaster position="top-center" richColors />
      <Nav />
      <PageHeader eyebrow="FAQ" title="Frequently asked questions." sub="Short, honest answers to the questions we hear most often. If you don't see your question here, please reach out on WhatsApp or call." />
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 space-y-10">
          {groups.map((g, gi) => (
            <div key={gi}>
              <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#16a34a] mb-3">{g.title}</div>
              <Accordion type="single" collapsible className="border-t border-slate-200">
                {g.items.map((x, i) => (
                  <AccordionItem key={i} value={`${gi}-${i}`} className="border-b border-slate-200">
                    <AccordionTrigger className="font-display font-semibold text-left text-[#0f2447] hover:no-underline py-5">{x.q}</AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed pb-5">{x.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
          <p className="text-sm text-slate-500 pt-6 border-t border-slate-200">Still have a question? Call <a className="text-[#0f2447] font-semibold" href={`tel:${SITE.phoneDial}`}>{SITE.phone}</a> or WhatsApp us and we&apos;ll respond within business hours.</p>
        </div>
      </section>
      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
