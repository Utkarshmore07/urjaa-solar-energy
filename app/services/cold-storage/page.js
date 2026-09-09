'use client'
import { Snowflake, Package, Leaf } from 'lucide-react'
import ServiceTemplate from '@/components/site/ServiceTemplate'
import { SERVICES } from '@/lib/site-config'

const service = { ...SERVICES.find(s => s.slug === 'cold-storage'), headline: 'Solar-powered cold storage for Indian agriculture.' }

export default function Page() {
  return (
    <ServiceTemplate
      service={service}
      longDesc="Solar systems for farm cold rooms, dairy chilling units, food-processing facilities and warehouse cold storage. Cut electricity bills, protect produce from spoilage and qualify for agricultural / MSME subsidies where applicable."
      includes={[
        'Sizing based on cold-room capacity (MT), running hours and compressor load',
        'Hybrid solar system with grid + battery to run compressors 24x7',
        'MNRE-approved panels and inverters suitable for high-load applications',
        'Structural mounting for shed rooftops or ground-mount adjacent to facility',
        'Compatibility with existing DG-set / grid supply',
        'Remote monitoring of solar generation and cold-room temperature (add-on)',
        'Post-commissioning service visits',
      ]}
      benefits={[
        { icon: <Snowflake className="h-5 w-5" />, t: 'Reliable cooling', d: 'Compressors keep running through the day on solar; grid + battery cover night hours.' },
        { icon: <Package className="h-5 w-5" />, t: 'Reduce spoilage', d: 'Uninterrupted cold chain preserves fruits, vegetables, dairy and processed foods.' },
        { icon: <Leaf className="h-5 w-5" />, t: 'Lower running cost', d: 'Cold storage is power-hungry. Solar can offset 50–80% of monthly electricity outgo.' },
      ]}
      sizes={[
        { s: '15 – 30 kW', u: 'Small farm cold room (5–10 MT)', a: 'Dairy, fruit, vegetable storage' },
        { s: '30 – 100 kW', u: 'Mid-scale cold storage (30–80 MT)', a: 'Food processing units, mandi chillers' },
        { s: '100 – 200 kW', u: 'Large cold storage / warehouse', a: 'Commercial cold-chain operators' },
      ]}
    />
  )
}
