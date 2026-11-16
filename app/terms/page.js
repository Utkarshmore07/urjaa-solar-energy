import { Toaster } from 'sonner'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import PageHeader from '@/components/site/PageHeader'
import { SITE } from '@/lib/site-config'
import Link from 'next/link'

export const metadata = {
  title: `Terms & Conditions | ${SITE.name}`,
  description: 'Terms and conditions governing the use of services provided by Urjaa Solar Energy.',
}

export default function TermsPage() {
  return (
    <main className="bg-white">
      <Toaster position="top-center" richColors />
      <Nav />
      <PageHeader
        eyebrow="Legal"
        title="Terms & Conditions"
        sub={`Last updated: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`}
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <div className="prose prose-slate max-w-none">

            {/* 1. Definitions */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">1. Definitions</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p><strong>"Company"</strong> refers to M/s Urjaa Solar Energy, a proprietorship firm registered in Uttar Pradesh, India, with GSTIN {SITE.gstin}.</p>
                <p><strong>"Customer"</strong> refers to any individual or entity that engages the Company for solar installation, consultation, or related services.</p>
                <p><strong>"Services"</strong> refers to solar photovoltaic (PV) system design, supply, installation, commissioning, and after-sales service offered by the Company.</p>
                <p><strong>"Site"</strong> refers to the physical location where services are to be performed, as mutually agreed between the Company and the Customer.</p>
                <p><strong>"Quotation"</strong> refers to the written price estimate provided by the Company, valid for the period stated therein.</p>
              </div>
            </div>

            {/* 2. Scope of Services */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">2. Scope of Services</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>2.1 The Company agrees to provide solar PV system design, supply, installation, and commissioning services as per the written scope agreed upon with the Customer.</p>
                <p>2.2 The scope includes site assessment, system design, equipment supply, installation by trained personnel, safety compliance, and handover documentation.</p>
                <p>2.3 The following are <strong>not included</strong> unless explicitly stated in the written quotation:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Electrical wiring modifications beyond the solar system's interconnection point</li>
                  <li>Civil construction work beyond standard mounting structure installation</li>
                  <li>DISCOM metering charges or statutory fees (where applicable)</li>
                  <li>Permit or NOC procurement not directly related to solar installation</li>
                  <li>Battery storage systems unless specifically mentioned</li>
                </ul>
              </div>
            </div>

            {/* 3. Quotation & Pricing */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">3. Quotation & Pricing</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>3.1 All quotations are indicative and based on information provided by the Customer. A firm price is shared after a physical site survey.</p>
                <p>3.2 Prices are exclusive of applicable GST. GST at the prevailing rate will be added to all invoices.</p>
                <p>3.3 Quotation validity period: <strong>30 days</strong> from the date of issue, unless otherwise stated.</p>
                <p>3.4 Prices are subject to change in the event of: foreign exchange rate fluctuations affecting imported components, increase in manufacturer prices, or changes in government subsidies or duties.</p>
                <p>3.5 A written breakdown of costs (Bill of Quantities / BOQ) is provided with every quotation, detailing brand, model, quantity and unit price of each component.</p>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">Quotation Notes Used in Our PDF Estimates</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>PDF quotations are estimates prepared from the customer-provided bill, roof area, roof type and consumer category. Final system size, generation, savings and pricing are confirmed after physical site survey, shadow analysis and structural review.</p>
                <p>Component brands, model numbers, quantities and warranties are confirmed in the final signed BOQ. The standard design separates solar modules, inverter, mounting structure, cables, BOS and electrical protection so substitutions are visible to the Customer.</p>
                <p>Indicative savings, payback, CO₂ offset and subsidy figures are not guarantees. They depend on irradiance, roof orientation, shading, weather, tariff, DISCOM rules, system availability and prevailing government guidelines.</p>
                <p>Quotation validity is 30 days unless otherwise stated. The quotation is not a binding offer until the final BOQ, payment schedule and installation scope are accepted in writing.</p>
              </div>
            </div>

            {/* 4. Payment Terms */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">4. Payment Terms</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>4.1 Standard payment schedule for residential installations:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>50%</strong> advance at the time of order confirmation</li>
                  <li><strong>30%</strong> upon delivery of equipment to site</li>
                  <li><strong>20%</strong> upon commissioning and handover</li>
                </ul>
                <p>4.2 Payment terms for commercial and industrial projects are defined in the individual project agreement.</p>
                <p>4.3 Payments must be made via bank transfer, UPI, or cheque in favour of <strong>M/s Urjaa Solar Energy</strong>.</p>
                <p>4.4 Delayed payments attract interest at <strong>1.5% per month</strong> on the outstanding amount.</p>
                <p>4.5 The Company reserves the right to withhold commissioning if payment milestones are not met.</p>
              </div>
            </div>

            {/* 5. Installation */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">5. Installation</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>5.1 Installation timelines are indicative: <strong>3–7 working days</strong> for residential systems (≤10 kW) and <strong>10–30 working days</strong> for commercial / industrial systems, subject to site readiness.</p>
                <p>5.2 The Customer must provide clear, unobstructed access to the installation site and ensure all necessary permissions (society NOC, building owner consent, etc.) are obtained prior to commencement.</p>
                <p>5.3 The Company is not responsible for delays caused by: force majeure events, non-availability of site access, pending regulatory approvals, or Customer-initiated scope changes.</p>
                <p>5.4 The Customer must ensure the site electrical infrastructure is compliant with IE Rules before the solar installation.</p>
                <p>5.5 The Company shall use its trained technicians for all installations and will not subcontract the core electrical work without prior intimation.</p>
              </div>
            </div>

            {/* 6. Equipment & Warranty */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">6. Equipment & Warranty</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>6.1 All equipment supplied is new, unused, and sourced from authorised Indian distributors of the respective manufacturers.</p>
                <p>6.2 Standard warranty terms:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Solar Panels:</strong> Manufacturer warranty as per OEM terms (typically 10-year product warranty, 25-year linear performance warranty)</li>
                  <li><strong>Inverters:</strong> 5-year standard warranty (extendable up to 10 years on certain brands)</li>
                  <li><strong>Installation Workmanship:</strong> 1 year from the date of commissioning</li>
                  <li><strong>Mounting Structure:</strong> 5-year warranty against manufacturing defects</li>
                </ul>
                <p>6.3 Warranty is valid only when: equipment is used under normal operating conditions, no unauthorised modifications are made, and payment is fully settled.</p>
                <p>6.4 The Company facilitates warranty claims with the OEM. Warranty service does not include labour charges for panel replacement unless covered by manufacturer policy.</p>
              </div>
            </div>

            {/* 7. Net-Metering & Grid Connection */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">7. Net-Metering & Grid Connection</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>7.1 The Company assists with the DISCOM net-metering application, but approval timelines are governed by the respective electricity distribution company and are outside the Company's control.</p>
                <p>7.2 The Customer must have a valid electricity connection and ownership / NOC from the property owner before a net-metering application can be filed.</p>
                <p>7.3 DISCOM inspection charges, meter security deposit, and application fees are borne by the Customer.</p>
                <p>7.4 The Company is not responsible for delays or rejections by DISCOM due to policy, technical, or compliance reasons.</p>
              </div>
            </div>

            {/* 8. PM Surya Ghar Subsidy */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">8. Government Subsidy (PM Surya Ghar)</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>8.1 The Customer is responsible for registering on the national PM Surya Ghar portal (pmsuryaghar.gov.in) and providing all required documents.</p>
                <p>8.2 The Company provides technical assistance and documentation support to facilitate the subsidy claim.</p>
                <p>8.3 Subsidy disbursement is done directly by the government to the Customer's bank account after inspection and approval by the local DISCOM. The Company does not receive or hold subsidy amounts.</p>
                <p>8.4 Subsidy eligibility and amounts are subject to change based on MNRE guidelines. The Company will inform the Customer of any material changes.</p>
              </div>
            </div>

            {/* 9. Liability & Limitation */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">9. Liability & Limitation of Liability</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>9.1 The Company's liability is limited to the total contract value of the services rendered.</p>
                <p>9.2 The Company is not liable for:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Any indirect, consequential, or incidental damages</li>
                  <li>Loss of profits, business interruption, or reputational loss</li>
                  <li>Performance shortfalls arising from poor irradiance, extreme weather, or grid failures</li>
                  <li>Any defect caused by Customer negligence, third-party interference, or force majeure events</li>
                </ul>
                <p>9.3 Force majeure events include: natural disasters, war, civil unrest, government actions, pandemic, or any event beyond the Company's reasonable control.</p>
              </div>
            </div>

            {/* 10. Intellectual Property */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">10. Intellectual Property</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>10.1 System designs, drawings, BOQs, and proposals prepared by the Company are intellectual property of M/s Urjaa Solar Energy and must not be reproduced without written consent.</p>
                <p>10.2 The Customer grants permission for the Company to use photographs of the installed system for promotional purposes, unless explicitly declined in writing.</p>
              </div>
            </div>

            {/* 11. Data Privacy */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">11. Data Privacy</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>11.1 The Company collects personal information (name, phone, email, address) solely for the purpose of providing services and communicating with the Customer.</p>
                <p>11.2 Data is not sold or shared with third-party marketers. Data may be shared with component manufacturers or DISCOM for warranty and regulatory purposes.</p>
                <p>11.3 Customer data is retained for a period of <strong>5 years</strong> from the date of last service, for warranty and service purposes.</p>
                <p>11.4 See our <Link href="/privacy" className="text-[#16a34a] underline">Privacy Policy</Link> for full details.</p>
              </div>
            </div>

            {/* 12. Governing Law */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">12. Governing Law & Dispute Resolution</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>12.1 These terms are governed by the laws of India, specifically the laws applicable in the State of Uttar Pradesh.</p>
                <p>12.2 Any dispute arising out of or in connection with these terms shall first be attempted to be resolved through mutual discussion within <strong>30 days</strong> of written notice.</p>
                <p>12.3 If unresolved, the dispute shall be subject to the exclusive jurisdiction of the courts in <strong>Pratapgarh, Uttar Pradesh</strong>.</p>
              </div>
            </div>

            {/* 13. Amendment */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">13. Amendment</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>13.1 The Company reserves the right to amend these terms at any time. The updated terms will be published on the website with a revised "Last updated" date.</p>
                <p>13.2 Continued use of services after any amendment constitutes acceptance of the revised terms.</p>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-12 p-6 rounded-xl border border-slate-200 bg-slate-50">
              <h3 className="text-base font-semibold text-[#0f2447] mb-2">Questions about these terms?</h3>
              <p className="text-sm text-slate-600 mb-4">Contact us at <a href={`mailto:${SITE.email}`} className="text-[#16a34a]">{SITE.email}</a> or call <a href={`tel:${SITE.phoneDial}`} className="text-[#16a34a]">{SITE.phone}</a>.</p>
              <p className="text-xs text-slate-500">Registered Office: {SITE.addressFull}</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
