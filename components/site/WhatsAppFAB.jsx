'use client'
import { SITE } from '@/lib/site-config'

export default function WhatsAppFAB() {
  return (
    <a
      href={SITE.whatsappMsg("Hi Urjaa Solar Energy, I'd like to know more about solar installation.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor">
        <path d="M16.003 3.2C9.083 3.2 3.475 8.807 3.475 15.727c0 2.234.588 4.4 1.7 6.316L3.2 28.8l6.94-1.82a12.42 12.42 0 0 0 5.86 1.49h.005c6.918 0 12.526-5.607 12.526-12.526C28.531 8.807 22.923 3.2 16.003 3.2zm7.3 17.66c-.31.87-1.8 1.66-2.51 1.77-.64.1-1.45.14-2.34-.14a20.65 20.65 0 0 1-2.12-.79c-3.73-1.62-6.17-5.4-6.36-5.65-.19-.25-1.52-2.02-1.52-3.85 0-1.83.96-2.73 1.3-3.1.34-.37.74-.47.99-.47l.71.01c.23 0 .53-.09.83.63.31.75 1.06 2.6 1.15 2.79.09.19.16.4.03.65-.13.25-.19.4-.37.62-.19.22-.4.5-.57.67-.19.19-.39.4-.17.78.22.37.98 1.62 2.11 2.62 1.45 1.29 2.68 1.69 3.06 1.88.38.19.6.16.83-.09.22-.25.95-1.11 1.21-1.49.25-.37.5-.31.85-.19.35.13 2.23 1.05 2.61 1.24.38.19.63.28.72.44.09.16.09.93-.22 1.83z"/>
      </svg>
    </a>
  )
}
