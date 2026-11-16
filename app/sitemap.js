export default function sitemap() {
  const base = 'https://urjaasolarenergy.com'
  const now = new Date().toISOString()

  return [
    { url: base,                                     lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/about`,                          lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/vision-mission`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`,                        lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/residential`,           lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/commercial`,            lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/industrial`,            lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services/hybrid-solar-system`,   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services/cold-storage`,          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/services/solar-atta-chakki`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/products`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/projects`,                       lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/subsidy`,                        lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/faq`,                            lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
