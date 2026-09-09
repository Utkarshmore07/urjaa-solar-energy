'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function ContactForm({ compact = false, source = 'contact_form' }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', city: '', interest: 'residential', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) { toast.error('Please provide your name and phone.'); return }
    setSubmitting(true)
    try {
      const r = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      })
      const d = await r.json()
      if (d.ok) {
        toast.success('Thank you. Our team will reach out shortly.')
        setForm({ name: '', phone: '', email: '', city: '', interest: 'residential', message: '' })
      } else toast.error('Please try again.')
    } catch { toast.error('Network error. Please try again.') } finally { setSubmitting(false) }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className={compact ? 'space-y-4' : 'grid sm:grid-cols-2 gap-4'}>
        <div>
          <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Full Name *</Label>
          <Input className="mt-1.5 h-11" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Phone *</Label>
          <Input className="mt-1.5 h-11" placeholder="10-digit mobile" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        </div>
      </div>
      <div className={compact ? 'space-y-4' : 'grid sm:grid-cols-2 gap-4'}>
        <div>
          <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Email</Label>
          <Input className="mt-1.5 h-11" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div>
          <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">City</Label>
          <Input className="mt-1.5 h-11" placeholder="e.g. Mumbai" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
        </div>
      </div>
      <div>
        <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Interested In</Label>
        <Select value={form.interest} onValueChange={(v) => setForm({ ...form, interest: v })}>
          <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="residential">Residential Solar</SelectItem>
            <SelectItem value="commercial">Commercial Solar</SelectItem>
            <SelectItem value="industrial">Industrial Solar</SelectItem>
            <SelectItem value="consultation">General Consultation</SelectItem>
            <SelectItem value="amc">AMC / Service</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Message</Label>
        <Textarea className="mt-1.5" rows={3} placeholder="Share your monthly bill, roof size or any question..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
      </div>
      <Button type="submit" disabled={submitting} className="w-full h-12 bg-[#0f2447] hover:bg-[#0a1a34] text-white font-medium">
        {submitting ? 'Submitting…' : <>Request Callback <ArrowRight className="h-4 w-4 ml-2" /></>}
      </Button>
      <p className="text-[11px] text-slate-500 text-center">We&apos;ll respond within 24 business hours. No spam.</p>
    </form>
  )
}
