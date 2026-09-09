import { Toaster } from 'sonner'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import PageHeader from '@/components/site/PageHeader'
import { SITE } from '@/lib/site-config'
import Link from 'next/link'

export const metadata = {
  title: `Privacy Policy | ${SITE.name}`,
  description: 'Privacy policy governing how Urjaa Solar Energy collects, uses and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      <Toaster position="top-center" richColors />
      <Nav />
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        sub={`Last updated: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`}
      />

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <div className="prose prose-slate max-w-none">

            {/* Introduction */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">1. Introduction</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>M/s Urjaa Solar Energy (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;) is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services.</p>
                <p>This policy applies to all users of our website {SITE.website} and all customers who engage our solar installation services.</p>
                <p>By using our services, you consent to the data practices described in this policy. If you do not agree, please do not use our services or website.</p>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">2. Information We Collect</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p><strong>Personal Information</strong> — When you submit a consultation request, contact form, or engage our services, we may collect:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Full name</li>
                  <li>Phone number (primary contact method)</li>
                  <li>Email address</li>
                  <li>Residential / business address</li>
                  <li>City and district</li>
                  <li>Monthly electricity bill information (for system sizing)</li>
                  <li>Property ownership or occupancy details</li>
                </ul>
                <p><strong>Technical Data</strong> — When you visit our website, we may automatically collect:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website or source</li>
                </ul>
                <p><strong>Site & Project Data</strong> — During surveys and installations:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Roof photographs and structural assessments</li>
                  <li>Electricity bill copies (for subsidy applications)</li>
                  <li>Property documents for DISCOM submissions</li>
                  <li>System performance data (from inverter monitoring, if enabled)</li>
                </ul>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">3. How We Use Your Information</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>We use your information for the following purposes:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>To provide solar consultation and quotation services</li>
                  <li>To conduct site surveys and prepare system designs</li>
                  <li>To communicate with you about your project, installation schedule, and after-sales service</li>
                  <li>To process government subsidy applications (PM Surya Ghar)</li>
                  <li>To submit DISCOM net-metering applications on your behalf</li>
                  <li>To send service-related notifications and reminders</li>
                  <li>To respond to your queries and support requests</li>
                  <li>To improve our website and service processes</li>
                  <li>To comply with legal and regulatory obligations</li>
                </ul>
              </div>
            </div>

            {/* Data Sharing */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">4. How We Share Your Information</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>We do <strong>not sell</strong> your personal information to third-party marketers or advertisers.</p>
                <p>We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>DISCOM (Electricity Board):</strong> For net-metering applications and subsidy processing, as mandated by regulations</li>
                  <li><strong>MNRE / National Portal:</strong> For PM Surya Ghar registration and subsidy disbursement</li>
                  <li><strong>Solar Equipment Manufacturers:</strong> For warranty registration and claim processing</li>
                  <li><strong>Payment Processors:</strong> For processing online payments (Razorpay, bank transfers)</li>
                  <li><strong>Government Authorities:</strong> Where required by law or court order</li>
                  <li><strong>Service Subcontractors:</strong> For installation or service work, under confidentiality agreements</li>
                </ul>
              </div>
            </div>

            {/* Data Retention */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">5. Data Retention</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>We retain your personal information for the following periods:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Customer project records:</strong> 10 years from project completion (for warranty, tax and regulatory compliance)</li>
                  <li><strong>Consultation leads (not converted):</strong> 3 years from last contact</li>
                  <li><strong>Website analytics:</strong> 2 years (aggregate data only)</li>
                  <li><strong>DISCOM / Subsidy documents:</strong> As required by applicable regulations</li>
                </ul>
                <p>After these periods, data is deleted or anonymised unless retention is required by law.</p>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">6. Data Security</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>We implement reasonable technical and organisational security measures to protect your data:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Password-protected digital storage with access controls</li>
                  <li>Encrypted data transmission (HTTPS on our website)</li>
                  <li>Limited access to customer data within our team</li>
                  <li>Regular review of data access permissions</li>
                </ul>
                <p>No method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>
              </div>
            </div>

            {/* Cookies */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">7. Cookies & Tracking</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>Our website uses cookies and similar technologies:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Essential cookies:</strong> Required for website functionality (session management, form submissions)</li>
                  <li><strong>Analytics cookies:</strong> Google Analytics or similar tools to understand website usage patterns (anonymised)</li>
                  <li><strong>No advertising cookies:</strong> We do not use third-party advertising or tracking cookies</li>
                </ul>
                <p>You can control cookie settings through your browser. Disabling cookies may affect some website functionality.</p>
              </div>
            </div>

            {/* Third-Party Links */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">8. Third-Party Links</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>Our website may contain links to third-party websites (e.g., MNRE portal, government websites, WhatsApp). This Privacy Policy does not apply to those websites. We encourage you to read the privacy policies of any third-party sites you visit.</p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">9. Your Rights (GDPR / Indian Law)</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate personal data</li>
                  <li><strong>Erasure:</strong> Request deletion of your data (subject to legal retention requirements)</li>
                  <li><strong>Portability:</strong> Request your data in a structured, commonly used format</li>
                  <li><strong>Object:</strong> Object to certain processing activities</li>
                </ul>
                <p>To exercise any of these rights, contact us at <a href={`mailto:${SITE.email}`} className="text-[#16a34a]">{SITE.email}</a> or call <a href={`tel:${SITE.phoneDial}`} className="text-[#16a34a]">{SITE.phone}</a>. We will respond within 30 days.</p>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">10. Children&apos;s Privacy</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with personal data, please contact us immediately and we will take steps to remove that information.</p>
              </div>
            </div>

            {/* Changes to Policy */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#0f2447] mb-4">11. Changes to This Policy</h2>
              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The updated version will be published on this page with a revised &quot;Last updated&quot; date.</p>
                <p>We encourage you to review this page periodically for any changes.</p>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-12 p-6 rounded-xl border border-slate-200 bg-slate-50">
              <h3 className="text-base font-semibold text-[#0f2447] mb-2">Contact Us</h3>
              <p className="text-sm text-slate-600 mb-4">If you have any questions about this Privacy Policy or our data practices, contact us:</p>
              <div className="space-y-1 text-sm text-slate-700">
                <p><strong>Email:</strong> <a href={`mailto:${SITE.email}`} className="text-[#16a34a]">{SITE.email}</a></p>
                <p><strong>Phone:</strong> <a href={`tel:${SITE.phoneDial}`} className="text-[#16a34a]">{SITE.phone}</a></p>
                <p><strong>Address:</strong> {SITE.addressFull}</p>
                <p><strong>Data Controller:</strong> {SITE.founderFullName}, Proprietor, M/s Urjaa Solar Energy</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </main>
  )
}
