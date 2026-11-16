import './globals.css'
import { Providers } from './providers'
import { Inter, Space_Grotesk } from 'next/font/google'
import { SITE } from '@/lib/site-config'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk', display: 'swap' })

export const metadata = {
  title: `${SITE.name} — Rooftop Solar for Homes & Businesses in India`,
  description: `${SITE.name} designs, installs and services rooftop solar systems for residential, commercial and industrial customers. Founded by ${SITE.founder} in ${SITE.established}.`,
  keywords: 'rooftop solar India, residential solar, commercial solar, industrial solar, PM Surya Ghar, solar EMI, Urjaa Solar Energy',
  openGraph: {
    title: `${SITE.name} — Rooftop Solar in India`,
    description: `Reliable rooftop solar installation and service. Founded by ${SITE.founder} in ${SITE.established}.`,
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${grotesk.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="font-sans antialiased bg-white text-slate-900" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
