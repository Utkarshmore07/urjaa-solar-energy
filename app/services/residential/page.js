'use client'
import { Wheat, Zap, Wrench } from 'lucide-react'
import ServiceTemplate from '@/components/site/ServiceTemplate'
import { SERVICES } from '@/lib/site-config'

const service = { ...SERVICES.find(s => s.slug === 'residential'), headline: 'Rooftop solar for Indian homes.' }

export default function Page() {
  return (
    <ServiceTemplate
      service={service}
      longDesc="On-grid solar systems for independent houses, villas and apartments. We handle the entire process — design, installation, DISCOM net-metering and PM Surya Ghar subsidy paperwork."
      includes={[
        'Free site survey and shadow analysis by a qualified engineer',
        'System design based on your actual monthly electricity bill and roof geometry',
        'Supply of Tier-1 monocrystalline / bi-facial solar panels',
        'MNRE-approved string inverter with monitoring',
        'Galvanised mounting structure engineered for wind-load',
        'DC / AC cabling, MCBs, earthing and safety devices',
        'DISCOM net-metering application coordination',
        'PM Surya Ghar Yojana registration and subsidy paperwork',
        'Post-installation service visits within the first year',
      ]}
      sizes={[
        { s: '1 – 2 kW', u: 'Small home, ~100 units / month', a: 'Approx. 100–200 sqft roof' },
        { s: '3 – 5 kW', u: 'Mid-size home, ~300–500 units / month', a: 'Approx. 300–500 sqft roof' },
        { s: '6 – 10 kW', u: 'Large home / villa, 600+ units / month', a: 'Approx. 600–900 sqft roof' },
      ]}
    />
  )
}
