'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen, ImagePlus, Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import { toast, Toaster } from 'sonner'
import AdminShell from '@/components/admin/AdminShell'
import { adminFetch } from '@/lib/admin-auth'

const emptyPost = { title: '', slug: '', excerpt: '', content: '', cover_image: '', author: 'Urjaa Solar Energy', is_published: false }

function slugify(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState(emptyPost)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const load = async () => {
    try { const r = await adminFetch('/api/admin/blog'); const d = await r.json(); if (d.ok) setPosts(d.items || []) } catch {} finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const update = (key, value) => setForm(current => ({ ...current, [key]: value }))
  const startEdit = post => { setEditing(post.id); setForm({ ...post, slug: post.slug || slugify(post.title) }); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const reset = () => { setEditing(null); setForm(emptyPost) }

  const save = async event => {
    event.preventDefault()
    if (!form.title || !form.content) return toast.error('Add a title and article content')
    setSaving(true)
    try {
      const payload = { ...form, slug: form.slug || slugify(form.title) }
      const r = await adminFetch(editing ? `/api/admin/blog/${editing}` : '/api/admin/blog', { method: editing ? 'PUT' : 'POST', body: JSON.stringify(payload) })
      const d = await r.json()
      if (!r.ok || !d.ok) throw new Error(d.error || 'Could not save article')
      toast.success(editing ? 'Article updated' : 'Article created')
      reset(); load()
    } catch (error) { toast.error(error.message) } finally { setSaving(false) }
  }

  const upload = async event => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const body = new FormData(); body.append('file', file)
      const r = await adminFetch('/api/admin/blog/upload', { method: 'POST', body, headers: {} })
      const d = await r.json()
      if (!r.ok || !d.ok) throw new Error(d.error || 'Upload failed')
      update('cover_image', d.url); toast.success('Cover image uploaded')
    } catch (error) { toast.error(error.message) } finally { setUploading(false); event.target.value = '' }
  }

  const remove = async id => {
    if (!window.confirm('Delete this article?')) return
    const r = await adminFetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
    if (r.ok) { toast.success('Article deleted'); load() }
  }

  return (
    <AdminShell title="Solar Journal" subtitle="Write, edit and publish useful solar information">
      <Toaster position="top-center" richColors />
      <div className="grid xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] gap-6 items-start">
        <form onSubmit={save} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="border-b border-slate-200 px-5 py-4 flex items-center justify-between">
            <div><div className="font-semibold text-[#0f2447]">{editing ? 'Edit article' : 'Write a new article'}</div><div className="text-xs text-slate-500 mt-0.5">Long-form articles appear in the public Solar Journal.</div></div>
            {editing && <button type="button" onClick={reset} className="text-slate-500 hover:text-slate-900" title="Cancel editing"><X className="h-4 w-4" /></button>}
          </div>
          <div className="p-5 space-y-4">
            <input value={form.title} onChange={e => update('title', e.target.value)} placeholder="Article title" className="w-full border-0 border-b border-slate-200 px-0 py-3 font-display text-2xl font-bold text-[#0f2447] outline-none focus:border-emerald-500" />
            <div className="grid sm:grid-cols-2 gap-3"><input value={form.slug} onChange={e => update('slug', slugify(e.target.value))} placeholder="url-slug" className="h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-emerald-500" /><input value={form.author} onChange={e => update('author', e.target.value)} placeholder="Author" className="h-10 rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-emerald-500" /></div>
            <textarea value={form.excerpt} onChange={e => update('excerpt', e.target.value)} placeholder="Short summary shown on the journal index" rows={3} className="w-full rounded-md border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500" />
            <textarea value={form.content} onChange={e => update('content', e.target.value)} placeholder="Write the article here..." rows={16} className="w-full rounded-md border border-slate-200 p-3 text-sm leading-7 outline-none focus:border-emerald-500" />
            <div className="rounded-lg border border-dashed border-slate-300 p-4"><div className="flex items-center justify-between gap-3"><div><div className="text-sm font-medium text-[#0f2447]">Cover image</div><div className="text-xs text-slate-500">JPG, PNG or WebP up to 5 MB</div></div><label className="cursor-pointer inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold text-[#0f2447] hover:bg-slate-200"><ImagePlus className="h-4 w-4" /> {uploading ? 'Uploading...' : 'Upload image'}<input type="file" accept="image/*" onChange={upload} className="hidden" /></label></div>{form.cover_image && <img src={form.cover_image} alt="Cover preview" className="mt-4 h-32 w-full rounded-md object-cover" />}</div>
            <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={form.is_published} onChange={e => update('is_published', e.target.checked)} className="h-4 w-4 accent-[#16a34a]" /> Publish on the public site</label>
            <div className="flex gap-3"><button disabled={saving} className="inline-flex h-10 items-center gap-2 rounded-md bg-[#0f2447] px-4 text-sm font-semibold text-white hover:bg-[#0a1a34] disabled:opacity-50"><Save className="h-4 w-4" /> {saving ? 'Saving...' : editing ? 'Save changes' : 'Publish article'}</button>{editing && <button type="button" onClick={reset} className="h-10 rounded-md border border-slate-200 px-4 text-sm font-semibold text-slate-700">Cancel</button>}</div>
          </div>
        </form>

        <section className="rounded-xl border border-slate-200 bg-white overflow-hidden"><div className="border-b border-slate-200 px-5 py-4 flex items-center justify-between"><div><div className="font-semibold text-[#0f2447]">Your articles</div><div className="text-xs text-slate-500 mt-0.5">{posts.length} total</div></div><BookOpen className="h-5 w-5 text-emerald-600" /></div><div className="divide-y divide-slate-100">{loading && <div className="p-6 text-sm text-slate-500">Loading articles...</div>}{!loading && !posts.length && <div className="p-6 text-sm text-slate-500">No articles yet. Start writing on the left.</div>}{posts.map(post => <div key={post.id} className="p-4"><div className="flex gap-3"><div className="h-14 w-20 shrink-0 overflow-hidden rounded-md bg-slate-100">{post.cover_image && <img src={post.cover_image} alt="" className="h-full w-full object-cover" />}</div><div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold text-[#0f2447]">{post.title}</div><div className="mt-1 text-xs text-slate-500">{post.is_published ? 'Published' : 'Draft'} · {post.author}</div></div></div><div className="mt-3 flex items-center gap-3 text-xs font-semibold"><button onClick={() => startEdit(post)} className="inline-flex items-center gap-1 text-[#0f2447]"><Pencil className="h-3.5 w-3.5" /> Edit</button>{post.is_published && <Link href={`/blog/${post.slug}`} target="_blank" className="text-emerald-700">View</Link>}<button onClick={() => remove(post.id)} className="ml-auto inline-flex items-center gap-1 text-red-600"><Trash2 className="h-3.5 w-3.5" /> Delete</button></div></div>)}</div></section>
      </div>
    </AdminShell>
  )
}
