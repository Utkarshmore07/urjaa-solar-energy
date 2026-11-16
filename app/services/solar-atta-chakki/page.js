'use client'
import { Wheat, Fuel, TrendingDown } from 'lucide-react'
import ServiceTemplate from '@/components/site/ServiceTemplate'
import { SERVICES } from '@/lib/site-config'

const service = { ...SERVICES.find(s => s.slug === 'solar-atta-chakki'), headline: 'Solar atta chakki — flour mills powered by the sun.' }

export default function Page() {
  return (
    <ServiceTemplate
      service={service}
      longDesc="Purpose-built solar systems for atta chakki (flour mill) operators in villages, mandis and small towns. Eliminate diesel-generator costs, avoid load-shedding downtime and process grain reliably during daylight hours."
      includes={[
        'System sized to the exact motor rating of your chakki (typically 3–15 HP)',
        'Off-grid or grid-tied configuration with optional battery backup',
        'MPPT-based hybrid inverter compatible with rural voltage fluctuations',
        'Wind-load rated mounting for shed / mill roofs (metal or RCC)',
        'Copper cabling, MCBs, SPDs and earthing kit',
        'Basic operator training and on-site handover',
        'Free post-installation service visits',
      ]}
      benefits={[
        { icon: <Fuel className="h-5 w-5" />, t: 'Zero diesel cost', d: 'Replace 4–8 litres/day of DG diesel. Save ₹10,000–₹25,000 per month depending on usage.' },
        { icon: <TrendingDown className="h-5 w-5" />, t: 'Predictable running cost', d: 'Fixed monthly outgo. No exposure to fuel-price hikes or DISCOM tariff shocks.' },
        { icon: <Wheat className="h-5 w-5" />, t: 'Uninterrupted milling', d: 'Grind through the day even in load-shedding regions. Battery backup optional for evenings.' },
      ]}
      sizes={[
        { s: '3 – 5 kW', u: 'Small chakki (3–5 HP motor)', a: 'Village / small mandi installations' },
        { s: '5 – 10 kW', u: 'Mid-size chakki (5–10 HP)', a: 'Town mills with multiple product lines' },
        { s: '10 – 15 kW', u: 'Large commercial chakki', a: 'Chakki + auxiliary machines (sieve, packing)' },
      ]}
    />
  )
}
