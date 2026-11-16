'use client'
import ServiceTemplate from '@/components/site/ServiceTemplate'
import { SERVICES } from '@/lib/site-config'

const service = { ...SERVICES.find(s => s.slug === 'commercial'), headline: 'Cut operating cost with commercial rooftop solar.' }

export default function Page() {
  return (
    <ServiceTemplate
      service={service}
      longDesc="Solar systems for offices, hotels, retail chains, educational institutions, hospitals and cold storage. We work with your electrical team and property manager to design a system that fits load, roof and budget."
      includes={[
        'Load-profile study and demand-charge analysis',
        'Structural feasibility check on RCC, metal-sheet or asbestos roofs',
        'Detailed BOQ with brand-wise pricing',
        'CAPEX (own the asset) or OPEX / PPA (pay per unit) models',
        'Accelerated depreciation guidance for eligible entities',
        'DISCOM net-metering & HT/LT approvals',
        'Property-owner NOC and structural certification',
        'Remote monitoring dashboard for facility teams',
      ]}
      sizes={[
        { s: '10 – 50 kW', u: 'Small office / clinic / restaurant', a: '1,000 – 5,000 sqft roof' },
        { s: '50 – 200 kW', u: 'Hotel / school / retail store', a: '5,000 – 20,000 sqft roof' },
        { s: '200 – 500 kW', u: 'Office park / hospital / mall', a: '20,000+ sqft roof' },
      ]}
    />
  )
}
