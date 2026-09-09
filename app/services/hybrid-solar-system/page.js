'use client'
import { Battery, ZapOff, Home } from 'lucide-react'
import ServiceTemplate from '@/components/site/ServiceTemplate'
import { SERVICES } from '@/lib/site-config'

const service = { ...SERVICES.find(s => s.slug === 'hybrid-solar-system'), headline: 'Hybrid solar — solar + battery + grid, in one system.' }

export default function Page() {
  return (
    <ServiceTemplate
      service={service}
      longDesc="Hybrid solar systems combine solar panels with battery storage and grid connectivity. Ideal for tier-2 / tier-3 cities and areas with frequent power cuts — you generate during the day, store surplus in the battery, and draw from the grid only as a last resort."
      includes={[
        'Hybrid inverter (with built-in solar charge controller & battery management)',
        'Lithium-ion or tubular battery bank sized to your evening/night load',
        'Automatic grid switch-over during battery drain',
        'Priority load panel so critical circuits (lights, fans, fridge, Wi-Fi) never go off',
        'Mobile monitoring app: solar generation, battery SoC, grid import/export',
        'Optional net-metering (state-permitting) for grid export of surplus',
        'Free installation, testing and homeowner training',
      ]}
      benefits={[
        { icon: <ZapOff className="h-5 w-5" />, t: 'Power-cut immunity', d: 'Automatic transfer to battery within milliseconds when the grid fails. No downtime.' },
        { icon: <Battery className="h-5 w-5" />, t: 'Store your own power', d: 'Charge battery during the day from solar; use it at night. Cut evening peak-tariff usage.' },
        { icon: <Home className="h-5 w-5" />, t: 'Best for tier-2/3 cities', d: 'Regions with frequent 2–6 hour cuts benefit most — no diesel gen-set noise or fuel bills.' },
      ]}
      sizes={[
        { s: '3 – 5 kW', u: 'Home with critical loads', a: '2–5 kWh battery, ~4–8 hr backup' },
        { s: '5 – 10 kW', u: 'Villa / small business', a: '5–10 kWh battery, larger backup' },
        { s: '10 – 25 kW', u: 'Commercial establishment', a: '10–25 kWh battery + net-metering' },
      ]}
    />
  )
}
