'use client'
import ServiceTemplate from '@/components/site/ServiceTemplate'
import { SERVICES } from '@/lib/site-config'

const service = { ...SERVICES.find(s => s.slug === 'industrial'), headline: 'Higher-capacity solar for factories and warehouses.' }

export default function Page() {
  return (
    <ServiceTemplate
      service={service}
      longDesc="Rooftop and ground-mount solar installations for MSMEs, factories, cold-storage units and industrial parks. Every project starts with a structural survey and load-profile study."
      includes={[
        'Detailed load-profile and demand-charge analysis',
        'Structural feasibility check on metal, RCC or asbestos roofs',
        'HT / LT compatibility and DISCOM approvals',
        'Remote monitoring on every system',
        'Open-access and captive-consumption models',
        'Compliance with CEA, IS and fire-safety norms',
      ]}
      sizes={[
        { s: '500 kW – 1 MW', u: 'MSME factories / cold storage', a: '50,000+ sqft roof' },
        { s: '1 – 3 MW', u: 'Mid-scale manufacturing / warehousing', a: 'Multi-shed rooftop or ground-mount' },
        { s: '3 MW +', u: 'Large industrial estate / cluster', a: 'Project-based, feasibility-driven' },
      ]}
    />
  )
}
