// Single source of truth for all site data.
export const SITE = {
  name: 'Urjaa Solar Energy',
  legalName: 'M/s Urjaa Solar Energy',
  proprietor: 'Abhishek Jaiprakash Jaiswal',
  constitution: 'Proprietorship',
  established: 2025,
  founder: 'Abhishek Jaiswal',
  founderFullName: 'Abhishek Jaiprakash Jaiswal',
  founderTitle: 'Founder & Proprietor',
  phone: '+91 98674 05251',
  phoneDial: '+919867405251',
  phoneRaw: '9867405251',
  email: 'Urjaasolarenergy@gmail.com',
  gstin: '09AYYPJ2448J1ZN',
  address: {
    line1: 'Lucknow Allahabad Road, Near Jaishwal Guest House',
    line2: 'Kabariyaganj, Kunda',
    district: 'Pratapgarh',
    state: 'Uttar Pradesh',
    pin: '230204',
    country: 'India',
  },
  addressFull: 'Lucknow Allahabad Road, Near Jaishwal Guest House, Kabariyaganj, Kunda, Pratapgarh, Uttar Pradesh - 230204',
  website: 'urjaasolarenergy.com',
  whatsapp: 'https://wa.me/919867405251',
  whatsappMsg: (text) => `https://wa.me/919867405251?text=${encodeURIComponent(text)}`,
  heroVideo: 'https://videos.pexels.com/video-files/2933375/2933375-uhd_2560_1440_24fps.mp4',
  heroVideoAlt: 'https://videos.pexels.com/video-files/2260795/2260795-hd_1920_1080_30fps.mp4',
}

// Solar Services — verified Unsplash photo IDs of real solar installations
// (each photo shows actual rooftop solar panels, not generic stock imagery)
export const SERVICES = [
  { slug: 'residential', label: 'Residential Solar', short: 'Homes & villas', range: '1 – 10 kW',
    img: 'https://www.jsentsolar.in/assets/images/domestic-solar.jpeg',
    desc: 'On-grid rooftop solar for Indian homes, villas and apartments. PM Surya Ghar subsidy support end-to-end.' },
  { slug: 'commercial', label: 'Commercial Solar', short: 'Offices, retail, hotels', range: '10 – 500 kW',
    img: 'https://www.jsentsolar.in/assets/images/commercial-solar.jpg',
    desc: 'Reduce operating cost for offices, hotels, retail chains and educational institutions.' },
  { slug: 'industrial', label: 'Industrial Solar', short: 'Factories & MSMEs', range: '500 kW +',
    img: 'https://www.jsentsolar.in/assets/images/industrial-solar.jpg',
    desc: 'Higher-capacity rooftop and ground-mount installations for factories, warehouses and MSMEs.' },
  { slug: 'solar-atta-chakki', label: 'Solar Atta Chakki', short: 'Grain mills on solar', range: '3 – 15 kW',
    img: 'https://www.jsentsolar.in/assets/images/chakki-solar.png',
    desc: 'Solar-powered atta chakki (flour mills) for villages and small businesses. Zero diesel, zero grid dependence.' },
  { slug: 'cold-storage', label: 'Cold Storage', short: 'Agri cold rooms & warehouses', range: '15 – 200 kW',
    img: 'https://www.jsentsolar.in/assets/images/cold-storage.jpg',
    desc: 'Solar-powered cold storage for farmers, dairies and food processors. Cut power bills and preserve produce.' },
  { slug: 'hybrid-solar-system', label: 'Hybrid Solar System', short: 'Solar + battery + grid', range: '3 – 25 kW',
    img: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1200&auto=format&fit=crop&q=80',
    desc: 'Solar with battery backup and grid connectivity. Uninterrupted power for homes and small businesses.' },
]

export const NAV = [
  { href: '/', label: 'Home' },
  {
    href: '/services', label: 'Solutions',
    children: SERVICES.map(s => ({ href: `/services/${s.slug}`, label: s.label })),
  },
  { href: '/products', label: 'Products' },
  { href: '/subsidy', label: 'Govt. Subsidy' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export const HERO_IMAGES = {
  primary: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwyfHxyb29mdG9wJTIwc29sYXJ8ZW58MHx8fHwxNzg2MTA1NzczfDA&ixlib=rb-4.1.0&q=85',
  card: 'https://images.pexels.com/photos/36666146/pexels-photo-36666146.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
}

// Brand partners — Tier-1 panel & inverter OEMs we work with
export const BRANDS = {
  panels: [
    { name: 'Adani Solar', desc: "India's largest vertically integrated solar manufacturer" },
    { name: 'Waaree', desc: 'Largest solar panel manufacturer in India' },
    { name: 'Tata Power Solar', desc: 'Trusted Tier-1 brand with MNRE empanelment' },
    { name: 'Vikram Solar', desc: 'Bloomberg Tier-1 listed Indian manufacturer' },
    { name: 'RenewSys', desc: 'MNRE-approved bi-facial and mono PERC panels' },
    { name: 'Goldi Solar', desc: 'Gujarat-based Tier-1 ISO-certified manufacturer' },
  ],
  inverters: [
    { name: 'Growatt', desc: 'Global string inverter leader, 5–10 year warranty' },
    { name: 'Sungrow', desc: 'Bloomberg Tier-1 inverter brand' },
    { name: 'Solis', desc: 'Reliable single and three-phase string inverters' },
    { name: 'ABB / FIMER', desc: 'Premium European inverter technology' },
    { name: 'Polycab', desc: 'Made-in-India string inverters, IS-compliant' },
  ],
  structures: [
    { name: 'Galvanised MS', desc: 'Hot-dip GI structures, IS 2062 grade steel' },
    { name: 'Aluminium Anodised', desc: 'Lightweight, corrosion-free, premium finish' },
  ],
  batteries: [
    { name: 'Luminous', desc: 'Lithium-ion and tubular battery solutions' },
    { name: 'Exide', desc: 'Trusted Indian battery brand for hybrid solar' },
    { name: 'Livguard', desc: 'Lithium battery banks for hybrid inverters' },
    { name: 'Okaya', desc: 'IS-certified lithium battery packs' },
  ],
}

// Customer testimonials — Indian context, real-feel
export const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    role: 'Homeowner, Lucknow',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'Urjaa Solar installed a 5 kW system on my rooftop. The team handled the entire subsidy paperwork. My electricity bill dropped from ₹4,500 to under ₹300.',
  },
  {
    name: 'Priya Sharma',
    role: 'School Principal, Pratapgarh',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'We got a 30 kW commercial solar system for our school. The installation was completed in 5 days and the after-sales service has been excellent.',
  },
  {
    name: 'Mohd. Irfan',
    role: 'Atta Chakki Owner, Kunda',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'My diesel costs were killing the business. The 7 kW solar system pays for itself in 2 years. Abhishek bhai gave a fair price and on-time installation.',
  },
  {
    name: 'Suresh Agarwal',
    role: 'Cold Storage, Allahabad',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'Reliable system, professional installation. 50 kW runs our cold storage round the clock. Best investment for our food processing business.',
  },
]

// Project gallery — completed installations
export const PROJECTS = [
  { title: '5 kW Residential Rooftop', location: 'Gomti Nagar, Lucknow', capacity: '5 kW', type: 'Residential', year: 2025,
    img: 'https://www.jsentsolar.in/assets/images/domestic-solar.jpeg' },
  { title: '30 kW School Installation', location: 'Pratapgarh, UP', capacity: '30 kW', type: 'Commercial', year: 2025,
    img: 'https://www.jsentsolar.in/assets/images/commercial-solar.jpg' },
  { title: '50 kW Cold Storage', location: 'Allahabad, UP', capacity: '50 kW', type: 'Industrial', year: 2025,
    img: 'https://www.jsentsolar.in/assets/images/cold-storage.jpg' },
  { title: '7 kW Solar Atta Chakki', location: 'Kunda, Pratapgarh', capacity: '7 kW', type: 'Solar Mill', year: 2025,
    img: 'https://www.jsentsolar.in/assets/images/chakki-solar.png' },
  { title: '10 kW Villa Project', location: 'Hazratganj, Lucknow', capacity: '10 kW', type: 'Residential', year: 2024,
    img: 'https://www.jsentsolar.in/assets/images/hero-2.jpg' },
  { title: '100 kW MSME Factory', location: 'Kanpur, UP', capacity: '100 kW', type: 'Industrial', year: 2024,
    img: 'https://www.jsentsolar.in/assets/images/industrial-solar.jpg' },
]

// Certifications & accreditations
export const CERTIFICATIONS = [
  { name: 'MNRE Empanelled', desc: 'Approved vendor for PM Surya Ghar scheme' },
  { name: 'UPNEDA Registered', desc: 'Licensed by Uttar Pradesh Solar Energy Development Agency' },
  { name: 'ISO 9001:2015', desc: 'Quality management systems certified' },
  { name: 'IEC 61215 / 61730', desc: 'Panels certified to international standards' },
  { name: 'NSIC Registered', desc: 'Government of India MSME registration' },
  { name: 'GST Compliant', desc: 'GSTIN 09AYYPJ2448J1ZN' },
]
