import Link from 'next/link'
import { ArrowRight, BookOpen, PenLine } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import { SITE } from '@/lib/site-config'
import { SOLAR_JOURNAL } from '@/lib/solar-journal'
import { getServiceClient } from '@/lib/supabase-server'

export const metadata = {
  title: `Solar Journal | ${SITE.name}`,
  description: 'Practical solar guides written by the Urjaa Solar Energy team.',
}

async function getPublishedPosts() {
  try {
    const { data } = await getServiceClient()
      .from('blog_posts')
      .select('title,slug,excerpt,cover_image,author,published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
    return (data || []).map(post => ({
      ...post,
      image: post.cover_image,
      category: 'Urjaa Journal',
      date: post.published_at ? new Date(post.published_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Journal',
      href: `/blog/${post.slug}`,
    }))
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const databasePosts = await getPublishedPosts()
  const posts = [...databasePosts, ...SOLAR_JOURNAL.filter(post => !databasePosts.some(item => item.slug === post.slug))]

  return (
    <main className="bg-white">
      <Nav />
      <section className="border-b border-slate-200 bg-[#f6f8f5] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex max-w-3xl flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700"><BookOpen className="h-4 w-4" /> Solar Journal</div>
              <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-[#0f2447] md:text-5xl">Clear solar thinking for real projects.</h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">Practical explainers, field notes and subsidy checklists written for homeowners, businesses and the people who maintain their systems.</p>
            </div>
            <Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#0f2447] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0a1a34]"><PenLine className="h-4 w-4" /> Ask our team</Link>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-8 flex items-end justify-between"><div><div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">From the journal</div><h2 className="mt-2 font-display text-2xl font-bold text-[#0f2447]">Read, save and share</h2></div><div className="text-sm text-slate-500">{posts.length} guides</div></div>
          <div className="grid gap-6 lg:grid-cols-3">
            {posts.map(post => (
              <article key={post.slug} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                <div className="aspect-[16/9] overflow-hidden bg-slate-100">{post.image && <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />}</div>
                <div className="p-6"><div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-emerald-700"><span>{post.category}</span><span className="text-slate-400">{post.date}</span></div><h3 className="mt-3 font-display text-xl font-bold text-[#0f2447]">{post.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{post.excerpt}</p><Link href={post.href} className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0f2447]">Read the full guide <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></Link></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-slate-200 bg-[#0f2447] py-14"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 sm:flex-row sm:items-center lg:px-8"><div><h2 className="font-display text-2xl font-bold text-white">Have a site-specific question?</h2><p className="mt-2 text-sm text-white/65">Bring us your bill, roof or project brief. We will help you think it through.</p></div><Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-[#fbbf24] px-5 py-3 text-sm font-semibold text-[#0f2447] hover:bg-amber-300">Talk to Urjaa <ArrowRight className="h-4 w-4" /></Link></div></section>
      <Footer /><WhatsAppFAB />
    </main>
  )
}
