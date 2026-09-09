import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'
import WhatsAppFAB from '@/components/site/WhatsAppFAB'
import { SITE } from '@/lib/site-config'
import { SOLAR_JOURNAL } from '@/lib/solar-journal'
import { getServiceClient } from '@/lib/supabase-server'

export function generateStaticParams() {
  return SOLAR_JOURNAL.map(post => ({ slug: post.slug }))
}

export function generateMetadata({ params }) {
  const post = SOLAR_JOURNAL.find(item => item.slug === params.slug)
  return post
    ? { title: `${post.title} | ${SITE.name}`, description: post.excerpt }
    : { title: `Solar Journal | ${SITE.name}` }
}

export default async function JournalArticle({ params }) {
  const post = SOLAR_JOURNAL.find(item => item.slug === params.slug) || await getDatabasePost(params.slug)
  if (!post) notFound()

  return (
    <main className="bg-white">
      <Nav />
      <article>
        <header className="border-b border-slate-200 bg-slate-50 py-20">
          <div className="mx-auto max-w-3xl px-5 lg:px-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Solar Journal
            </Link>
            <div className="mt-10 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
              <BookOpen className="h-4 w-4" /> {post.category} <span className="text-slate-400">/ {post.date}</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-[#0f2447] md:text-5xl">{post.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">{post.excerpt}</p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-5 py-14 lg:px-8">
          <div className="aspect-[16/8] overflow-hidden rounded-xl bg-slate-100">
            <img src={post.image} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="mt-12 space-y-10">
            {post.sections.map(section => (
              <section key={section.heading}>
                <h2 className="font-display text-2xl font-bold text-[#0f2447]">{section.heading}</h2>
                <p className="mt-3 text-base leading-8 text-slate-700">{section.body}</p>
              </section>
            ))}
          </div>
          <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">
            <p>This guide is for general information. Site conditions, DISCOM rules and government programmes can change.</p>
            <a href={post.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 font-semibold text-[#0f2447]">Reference: {post.source} <ExternalLink className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </article>
      <Footer />
      <WhatsAppFAB />
    </main>
  )
}

async function getDatabasePost(slug) {
  try {
    const { data } = await getServiceClient().from('blog_posts').select('*').eq('slug', slug).eq('is_published', true).single()
    if (!data) return null
    return { ...data, image: data.cover_image, category: 'Urjaa Journal', date: data.published_at || 'Journal', sections: [{ heading: 'Article', body: data.content }] }
  } catch {
    return null
  }
}
