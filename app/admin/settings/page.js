'use client'
import { useEffect, useState } from 'react'
import { Save, RefreshCw } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import AdminShell from '@/components/admin/AdminShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { adminFetch } from '@/lib/admin-auth'
import { SITE } from '@/lib/site-config'

export default function AdminSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    phone: SITE.phone,
    email: SITE.email,
    whatsappNumber: SITE.phoneRaw,
    founder: SITE.founder,
    founderFullName: SITE.founderFullName,
    established: String(SITE.established),
    gstin: SITE.gstin,
    addressLine1: SITE.address.line1,
    addressLine2: SITE.address.line2,
    district: SITE.address.district,
    state: SITE.address.state,
    pin: SITE.address.pin,
    heroHeadline: 'Reliable solar energy for your home and business.',
    heroSubtitle: 'Urjaa Solar Energy designs, installs and services rooftop solar systems for residential, commercial and industrial customers across India.',
    heroVideo: SITE.heroVideo,
  })

  useEffect(() => {
    (async () => {
      try {
        const r = await adminFetch('/api/admin/settings')
        const d = await r.json()
        if (d.ok && d.settings) setForm(f => ({ ...f, ...d.settings }))
      } catch {} finally { setLoading(false) }
    })()
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      const r = await adminFetch('/api/admin/settings', { method: 'PUT', body: JSON.stringify(form) })
      const d = await r.json()
      if (d.ok) toast.success('Settings saved. Site is now using the updated values.')
      else toast.error('Save failed')
    } catch { toast.error('Network error') } finally { setSaving(false) }
  }

  const field = (name, label, extra = {}) => (
    <div>
      <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">{label}</Label>
      <Input className="mt-1.5 h-11" value={form[name] || ''} onChange={e => setForm({ ...form, [name]: e.target.value })} {...extra} />
    </div>
  )

  return (
    <AdminShell title="Site Settings" subtitle="Changes take effect immediately on the public site">
      <Toaster position="top-center" richColors />
      {loading ? (
        <div className="py-16 text-center text-slate-500">Loading…</div>
      ) : (
        <div className="space-y-6">
          <Section title="Contact">
            <div className="grid md:grid-cols-2 gap-4">
              {field('phone', 'Phone (display)')}
              {field('whatsappNumber', 'WhatsApp Number (digits only, with country code)')}
              {field('email', 'Email')}
              {field('founder', 'Founder (display name)')}
            </div>
          </Section>

          <Section title="Business & Legal">
            <div className="grid md:grid-cols-2 gap-4">
              {field('founderFullName', 'Proprietor (Legal name)')}
              {field('gstin', 'GSTIN')}
              {field('established', 'Established (year)')}
            </div>
          </Section>

          <Section title="Registered Address">
            <div className="grid md:grid-cols-2 gap-4">
              {field('addressLine1', 'Address Line 1')}
              {field('addressLine2', 'Address Line 2')}
              {field('district', 'District')}
              {field('state', 'State')}
              {field('pin', 'PIN Code')}
            </div>
          </Section>

          <Section title="Home Hero">
            <div className="space-y-4">
              <div>
                <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Headline</Label>
                <Input className="mt-1.5 h-11" value={form.heroHeadline} onChange={e => setForm({ ...form, heroHeadline: e.target.value })} />
              </div>
              <div>
                <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Sub-headline</Label>
                <Textarea className="mt-1.5" rows={3} value={form.heroSubtitle} onChange={e => setForm({ ...form, heroSubtitle: e.target.value })} />
              </div>
              <div>
                <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Hero Drone Video URL (MP4)</Label>
                <Input className="mt-1.5 h-11" value={form.heroVideo} onChange={e => setForm({ ...form, heroVideo: e.target.value })} placeholder="https://… .mp4" />
                <p className="text-xs text-slate-500 mt-2">Paste a direct .mp4 URL. Falls back to a poster image if video fails to load.</p>
              </div>
            </div>
          </Section>

          <div className="flex items-center gap-3 sticky bottom-4 bg-white border border-slate-200 rounded-xl p-4 shadow-lg">
            <Button onClick={save} disabled={saving} className="h-11 px-6 bg-[#0f2447] hover:bg-[#0a1a34] text-white font-medium">
              {saving ? 'Saving…' : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()} className="h-11 border-slate-300"><RefreshCw className="h-4 w-4 mr-2" /> Discard</Button>
            <div className="text-xs text-slate-500 ml-auto hidden md:block">These values override the default site config.</div>
          </div>
        </div>
      )}
    </AdminShell>
  )
}

function Section({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 lg:p-6">
      <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-4">{title}</div>
      {children}
    </div>
  )
}
