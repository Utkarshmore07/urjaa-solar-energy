export default function PageHeader({ eyebrow, title, sub, minimal = false }) {
  return (
    <section className={`pt-32 pb-14 ${minimal ? 'bg-white' : 'bg-slate-50 border-b border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {eyebrow && <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#16a34a] mb-3">{eyebrow}</div>}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0f2447] tracking-tight max-w-3xl">{title}</h1>
        {sub && <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">{sub}</p>}
      </div>
    </section>
  )
}
