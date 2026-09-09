import Link from 'next/link'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import { ArrowUpRight, ArrowRight, BookOpen, ExternalLink } from 'lucide-react'
import { SITE } from '@/lib/site-config'
import { SOLAR_JOURNAL } from '@/lib/solar-journal'

const POSTS = SOLAR_JOURNAL

export const metadata = { title: `Solar Journal | ${SITE.name}`, description: 'Practical solar guides from Urjaa Solar Energy, readable on our site.' }

export default function BlogPage() {
  return <main className="bg-white"><Nav /><section className="border-b border-slate-200 bg-slate-50 py-20"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="max-w-2xl"><div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600"><BookOpen className="h-4 w-4" /> Solar journal</div><h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0f2447] md:text-5xl">Useful solar information, without the sales fog.</h1><p className="mt-5 text-base leading-relaxed text-slate-600">Practical explainers for homeowners and businesses. We link claims to official programme or standards sources so you can verify the details.</p></div></div></section><section className="py-16"><div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-3 lg:px-8">{POSTS.map(post => <article key={post.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="aspect-[16/9] overflow-hidden bg-slate-100"><img src={post.image} alt={post.title} className="h-full w-full object-cover" /></div><div className="p-6"><div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-emerald-600"><span>{post.category}</span><span className="text-slate-400">{post.date}</span></div><h2 className="mt-3 font-display text-xl font-bold text-[#0f2447]">{post.title}</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">{post.excerpt}</p><a href={post.href} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f2447]">Verify source: {post.source}<ExternalLink className="h-3.5 w-3.5" /></a></div></article>)}</div></section><section className="border-t border-slate-200 bg-[#0f2447] py-14"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 sm:flex-row sm:items-center lg:px-8"><div><h2 className="font-display text-2xl font-bold text-white">Have a site-specific question?</h2><p className="mt-2 text-sm text-white/70">Bring your bill, roof details and questions to a free consultation.</p></div><Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-300">Talk to an engineer <ArrowUpRight className="h-4 w-4" /></Link></div></section><Footer /><WhatsAppFAB /></main>
}
