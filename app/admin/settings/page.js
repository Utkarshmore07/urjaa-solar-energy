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
import { DEFAULT_SOLAR_ESTIMATE_CONFIG } from '@/lib/solar-estimates'

export default function AdminSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    phone: SITE.phone,
    email: SITE.email,
    whatsappNumber: SITE.whatsappNumber,
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
    technical_specs: JSON.stringify([
      { code: 'PV-01', title: 'Solar Panels', items: ['Tier-1 Monocrystalline', 'N-Type TOPCon', 'N-Type HJT', 'Bifacial technology', 'Manufacturer warranty'], tone: 'amber' },
      { code: 'INV-02', title: 'Inverters', items: ['On-grid inverters', 'Off-grid inverters', 'Hybrid inverters', 'MPPT technology', 'Monitoring capabilities', 'Supported battery compatibility'], tone: 'blue' },
      { code: 'MS-03', title: 'Mounting Structures', items: ['Hot-Dip Galvanized (HDG) structures', 'GI structures', 'Structural strength', 'Corrosion protection', 'Roof compatibility'], tone: 'emerald' },
      { code: 'BOS-04', title: 'Electrical Protection', items: ['DCDB, ACDB, SPD and earthing', 'Protection sized to final system', 'Commissioning checks'], tone: 'blue' },
    ], null, 2),
  })
  const [calcSettings, setCalcSettings] = useState(DEFAULT_SOLAR_ESTIMATE_CONFIG)

  useEffect(() => {
    (async () => {
      try {
        const r = await adminFetch('/api/admin/settings')
        const d = await r.json()
        if (d.ok && d.settings) setForm(f => ({ ...f, ...d.settings, technical_specs: typeof d.settings.technical_specs === 'string' ? d.settings.technical_specs : JSON.stringify(d.settings.technical_specs || JSON.parse(f.technical_specs), null, 2) }))
        const calcResponse = await adminFetch('/api/admin/calc-settings')
        const calcData = await calcResponse.json()
        if (calcData.ok) setCalcSettings(current => ({ ...current, ...Object.fromEntries(calcData.settings.map(item => [item.key, item.value])) }))
      } catch {} finally { setLoading(false) }
    })()
  }, [])

  const save = async () => {
    setSaving(true)
    try {
      const r = await adminFetch('/api/admin/settings', { method: 'PUT', body: JSON.stringify(form) })
      const d = await r.json()
      const calcResponse = await adminFetch('/api/admin/calc-settings', { method: 'PUT', body: JSON.stringify(calcSettings) })
      const calcData = await calcResponse.json()
      if (d.ok && calcData.ok) toast.success('Settings saved. Site is now using the updated values.')
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

          <Section title="Technical Specifications">
            <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Categories and bullet points (JSON)</Label>
            <Textarea className="mt-1.5 min-h-[260px] font-mono text-xs" value={form.technical_specs} onChange={e => setForm({ ...form, technical_specs: e.target.value })} />
            <p className="mt-2 text-xs text-slate-500">Edit the category titles and items here. The public specification cards update without a frontend deployment.</p>
          </Section>

          <Section title="Solar Calculator Assumptions">
            <div className="grid gap-4 md:grid-cols-3">
              {['cost_per_kw_residential', 'peak_sun_hours', 'system_efficiency_pct', 'panel_wattage', 'roof_area_per_panel_sqft', 'degradation_rate_pct'].map(key => (
                <div key={key}><Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">{key.replaceAll('_', ' ')}</Label><Input className="mt-1.5 h-11" type="number" value={calcSettings[key] ?? ''} onChange={e => setCalcSettings({ ...calcSettings, [key]: Number(e.target.value) })} /></div>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">These values drive generation, sizing, cost and long-term savings estimates. They are labelled as estimates to customers.</p>
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
