import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import LiveLoadCalculator from '@/components/site/LiveLoadCalculator'
import { SITE } from '@/lib/site-config'

export const metadata = {
  title: `Live Load Calculator | ${SITE.name}`,
  description: 'Calculate your appliance load, recommended solar system, inverter and battery size.',
}

export default function LoadCalculatorPage() {
  return <main className="bg-white"><Nav /><div className="h-16 lg:h-[70px]" /><LiveLoadCalculator /><Footer /><WhatsAppFAB /></main>
}