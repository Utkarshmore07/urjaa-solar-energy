'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, PhoneCall, ShieldCheck, CheckCircle2, MessageCircle, Star, Users, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SITE } from '@/lib/site-config'

// ─── Video hero backdrop ─────────────────────────────────────────────────────
function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 40%, #0f2744 70%, #071020 100%)',
        }}
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 z-10"
      >
        <source
          src="/video/solarvideo.mp4"
          type="video/mp4"
        />
        {/* Fallback to Pexels if local video fails */}
        <source
          src="https://videos.pexels.com/video-files/5528066/5528066-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
      </video>
      <div
        className="absolute inset-0 z-20"
        style={{
          background:
            'linear-gradient(175deg, rgba(10,22,40,0.70) 0%, rgba(10,22,40,0.50) 50%, rgba(10,22,40,0.85) 100%)',
        }}
      />
    </div>
  )
}

// ─── Ambient glow ────────────────────────────────────────────────────────────
function AmbientGlow() {
  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 left-10 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #16a34a 0%, transparent 70%)' }}
      />
    </div>
  )
}

// ─── Main Hero ───────────────────────────────────────────────────────────────
export default function CinematicSolarHero() {
  const [form, setForm] = useState({ name: '', phone: '', city: '', bill: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setSubmitting(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          city: form.city,
          message: form.bill ? `Monthly bill: ${form.bill}` : '',
          source: 'hero_form',
        }),
      })
    } catch {}
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-950"
      style={{ minHeight: '100svh' }}
      aria-label="Solar energy hero"
    >
      <HeroBackdrop />
      <AmbientGlow />

      <div className="relative z-40 flex min-h-[820px] items-center pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">

          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20">

            {/* ── Left: Text ─────────────────────────────────────────── */}
            <div className="text-white">

              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white/80 tracking-wide"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                PM Surya Ghar — Up to ₹78,000 subsidy available
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-[580px] font-display text-5xl sm:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-black leading-[1.02] tracking-tight text-white"
              >
                Switch to solar.
                <br />
                <span
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #fbbf24 0%, #f97316 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Save up to 100%.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-6 max-w-[500px] text-base lg:text-[1.05rem] leading-relaxed text-white/70"
              >
                Urjaa Solar Energy designs and installs rooftop solar systems for
                homes, businesses and industries across Uttar Pradesh.
                Engineering-first. Transparent pricing. Long-term service.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <Link href="/#calculator">
                  <Button
                    size="lg"
                    className="h-12 px-7 font-semibold text-slate-900 border-0 shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                      fontSize: '0.95rem',
                    }}
                  >
                    Calculate My Savings
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <a href={`tel:${SITE.phoneDial}`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-6 font-semibold text-white border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                    style={{ fontSize: '0.95rem' }}
                  >
                    <PhoneCall className="h-4 w-4 mr-2" />
                    Talk to an Expert
                  </Button>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2"
              >
                {[
                  { icon: <ShieldCheck className="h-3.5 w-3.5" />, label: 'MNRE Certified' },
                  { icon: <Star className="h-3.5 w-3.5" />, label: 'UPNEDA Registered' },
                  { icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: '25+ Projects Done' },
                ].map((it, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-white/60">
                    <span className="text-amber-400">{it.icon}</span>
                    {it.label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Consultation form card ─────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 32, y: 16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative lg:justify-self-end w-full max-w-[440px] mx-auto lg:mx-0"
            >
              {submitted ? (
                // ── Success state ──────────────────────────────────────
                <div
                  className="rounded-2xl border border-emerald-500/30 p-8 text-center"
                  style={{ background: 'rgba(5, 46, 22, 0.6)' }}
                >
                  <div className="mx-auto mb-5 h-16 w-16 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="h-9 w-9 text-emerald-400" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Request Received!</h3>
                  <p className="text-sm text-white/60 leading-relaxed max-w-xs mx-auto">
                    Our solar expert will call you within 24 hours to discuss your requirements.
                  </p>
                  <div className="mt-6 flex flex-col gap-2">
                    <a
                      href={`tel:${SITE.phoneDial}`}
                      className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors"
                    >
                      <PhoneCall className="h-4 w-4" /> Or call us directly
                    </a>
                    <a
                      href={SITE.whatsappMsg(`Hi Urjaa Solar, I submitted a consultation request. Name: ${form.name}.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02]"
                      style={{ background: '#25D366' }}
                    >
                      <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                // ── Form card ──────────────────────────────────────────
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(15, 30, 55, 0.85)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Card header — dark solid bar */}
                  <div
                    className="px-7 pt-7 pb-5"
                    style={{ background: 'rgba(0,0,0,0.25)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2.5 mb-1">
                          <div
                            className="h-8 w-8 rounded-lg flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' }}
                          >
                            <ThumbsUp className="h-4 w-4 text-white" />
                          </div>
                          <div className="font-display text-base font-bold text-white leading-tight">Free Consultation</div>
                        </div>
                        <p className="text-xs text-white/50 ml-10">
                          Talk to our solar expert — no commitment required
                        </p>
                      </div>
                      <div
                        className="shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          borderColor: 'rgba(251,191,36,0.4)',
                          color: '#fbbf24',
                          background: 'rgba(251,191,36,0.08)',
                        }}
                      >
                        No Spam
                      </div>
                    </div>

                    {/* Social proof row */}
                    <div className="mt-4 flex items-center gap-4 text-xs text-white/40">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        <span>500+ families consulted</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
                        <span>4.8/5 rating</span>
                      </div>
                    </div>
                  </div>

                  {/* Form body */}
                  <div className="px-7 pb-7 pt-5">
                    <form onSubmit={handleSubmit} className="space-y-3" aria-label="Solar consultation form">
                      <Input
                        required
                        placeholder="Your full name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="h-11 border-white/10 bg-white/8 text-white placeholder:text-white/35 text-sm focus:border-amber-400/50 focus:ring-amber-400/20 focus:bg-white/12 transition-all"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                        autoComplete="name"
                      />
                      <Input
                        required
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className="h-11 border-white/10 bg-white/8 text-white placeholder:text-white/35 text-sm focus:border-amber-400/50 focus:ring-amber-400/20 focus:bg-white/12 transition-all"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                        autoComplete="tel"
                      />
                      <Input
                        placeholder="Your city / district"
                        value={form.city}
                        onChange={e => setForm({ ...form, city: e.target.value })}
                        className="h-11 border-white/10 bg-white/8 text-white placeholder:text-white/35 text-sm focus:border-amber-400/50 focus:ring-amber-400/20 focus:bg-white/12 transition-all"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                        autoComplete="address-level2"
                      />
                      <Select value={form.bill} onValueChange={v => setForm({ ...form, bill: v })}>
                        <SelectTrigger
                          className="h-11 border-white/10 text-white/70 text-sm focus:border-amber-400/50 focus:ring-amber-400/20 transition-all"
                          style={{ background: 'rgba(255,255,255,0.06)' }}
                        >
                          <SelectValue placeholder="Monthly electricity bill" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Below ₹2,000">Below ₹2,000</SelectItem>
                          <SelectItem value="₹2,000 – ₹4,000">₹2,000 – ₹4,000</SelectItem>
                          <SelectItem value="₹4,000 – ₹8,000">₹4,000 – ₹8,000</SelectItem>
                          <SelectItem value="₹8,000 – ₹15,000">₹8,000 – ₹15,000</SelectItem>
                          <SelectItem value="Above ₹15,000">Above ₹15,000</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        type="submit"
                        disabled={submitting || !form.name || !form.phone}
                        className="h-12 w-full border-0 text-sm font-bold text-slate-900 transition-all duration-300"
                        style={{
                          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                          boxShadow: '0 4px 24px rgba(251,191,36,0.25)',
                        }}
                      >
                        {submitting ? (
                          'Sending…'
                        ) : (
                          <>
                            Book Free Consultation
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>

                    <p className="mt-4 text-center text-[10px] text-white/30">
                      Your details are secure. We only use them to contact you.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
