'use client'

import { useState } from 'react'
import { ArrowRight, Bot, Calculator, CheckCircle2, Clock3, MessageCircle, Send, Sparkles, X, Zap } from 'lucide-react'
import { SITE } from '@/lib/site-config'
import { useResponsiveDevice } from '@/hooks/use-mobile'

const QUICK_ACTIONS = [
  { label: 'Calculate my solar requirement', icon: Calculator, answer: 'Start with your monthly bill, city and roof area. Our solar calculator can estimate system size and savings, then our engineer can validate it with a site survey.' },
  { label: 'Check PM Surya Ghar subsidy', icon: CheckCircle2, answer: 'Eligible residential customers can apply through PM Surya Ghar. State and DISCOM rules may also affect the process, so we verify the current route for your location.' },
  { label: 'How much does solar cost?', icon: Zap, answer: 'Pricing depends on system size, roof conditions and components. Share your monthly bill and city with our team for a written estimate.' },
  { label: 'Installation timeline', icon: Clock3, answer: 'A typical residential installation takes around 3–7 days after approvals and material availability. A site survey gives the most accurate timeline.' },
]

function now() {
  return new Intl.DateTimeFormat('en-IN', { hour: 'numeric', minute: '2-digit' }).format(new Date())
}

export default function WhatsAppFAB() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const { isMobile, isTablet, isLaptop, isDesktop } = useResponsiveDevice()

  const sendToWhatsApp = text => {
    const message = text.trim() || 'Hi Urjaa Solar Energy, I would like help with solar for my property.'
    window.open(SITE.whatsappMsg(message), '_blank', 'noopener,noreferrer')
    setDraft('')
  }

  const ask = action => {
    if (action.label === 'Talk to a solar expert') {
      sendToWhatsApp(action.label)
      return
    }
    setMessages(current => [...current, { role: 'user', text: action.label, time: now() }])
    setTyping(true)
    window.setTimeout(() => {
      setMessages(current => [...current, { role: 'assistant', text: action.answer, time: now() }])
      setTyping(false)
    }, 420)
  }

  const sendDraft = event => {
    event.preventDefault()
    if (!draft.trim()) return
    sendToWhatsApp(draft)
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (draft.trim()) sendToWhatsApp(draft)
    }
  }

  const panelWidth = isMobile ? 'w-[calc(100vw-16px)] max-w-none' : isTablet ? 'w-[min(92vw,420px)]' : 'w-[min(400px,calc(100vw-20px))]'
  const panelHeight = isMobile ? 'h-[calc(100dvh-90px)] max-h-[640px]' : 'h-[min(640px,calc(100dvh-86px))]'
  const containerClass = isMobile
    ? 'left-1/2 bottom-[calc(env(safe-area-inset-bottom)+8px)] -translate-x-1/2 right-auto'
    : 'bottom-[max(14px,env(safe-area-inset-bottom))] right-3 sm:bottom-6 sm:right-6'

  return (
    <div className={`pointer-events-none fixed z-[9999] flex flex-col items-end gap-3 ${containerClass} [&>*]:pointer-events-auto`}>
      {open && (
        <section aria-label="Urjaa Solar Desk" className={`flex ${panelHeight} ${panelWidth} flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,36,71,0.22)] transition-all duration-200`}>
          <header className="flex min-h-[76px] shrink-0 items-center justify-between gap-3 bg-[#0b1d35] px-4 py-3.5 text-white sm:px-5">
            <div className="flex min-w-0 items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-400/10 text-emerald-300"><Bot className="h-5 w-5" /></div><div className="min-w-0"><h2 className="truncate font-display text-[16px] font-bold">Urjaa Solar Desk</h2><div className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online support</div></div></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close Urjaa Solar Desk" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"><X className="h-4 w-4" /></button>
          </header>

          <div aria-live="polite" className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[#f7f9fa] px-3 py-4 [scrollbar-color:#b8c5cc_transparent] [scrollbar-width:thin] sm:px-4">
            {!messages.length && <div className="space-y-4"><div className="flex gap-2.5"><div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"><Sparkles className="h-3.5 w-3.5" /></div><div className="max-w-[86%] rounded-2xl rounded-tl-md border border-slate-200 bg-white px-3.5 py-3 text-[13px] leading-relaxed text-slate-600 shadow-sm">Hi, I&apos;m the Urjaa Solar Desk. I can help you understand your solar requirement, savings, subsidy and installation process.</div></div><div className="pl-9 text-[10px] font-medium text-slate-400">Choose a topic to get started</div></div>}
            {messages.map((message, index) => <div key={`${message.time}-${index}`} className={`flex gap-2.5 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`${message.role === 'user' ? 'order-2 max-w-[82%] rounded-2xl rounded-tr-md bg-[#0f2447] text-white' : 'max-w-[86%] rounded-2xl rounded-tl-md border border-slate-200 bg-white text-slate-600 shadow-sm'} px-3.5 py-2.5 text-[13px] leading-relaxed`}><div>{message.text}</div><div className={`mt-1 text-[9px] ${message.role === 'user' ? 'text-white/55' : 'text-slate-400'}`}>{message.time}</div></div></div>)}
            {typing && <div className="flex items-center gap-2.5"><div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"><Bot className="h-3.5 w-3.5" /></div><div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-slate-200 bg-white px-3.5 py-3 shadow-sm"><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" /><span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" /></div></div>}
            <div className="flex flex-wrap gap-2 pt-1">{QUICK_ACTIONS.map(action => { const Icon = action.icon; return <button type="button" key={action.label} onClick={() => ask(action)} className="min-h-10 rounded-full border border-slate-200 bg-white px-3 text-left text-[11px] font-semibold text-[#0f2447] transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"><Icon className="mr-1.5 inline h-3.5 w-3.5 text-emerald-600" />{action.label}</button> })}<button type="button" onClick={() => ask({ label: 'Talk to a solar expert' })} className="min-h-10 rounded-full border border-amber-200 bg-amber-50 px-3 text-[11px] font-semibold text-[#0f2447] transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"><MessageCircle className="mr-1.5 inline h-3.5 w-3.5 text-amber-600" />Talk to an expert</button></div>
          </div>

          <form onSubmit={sendDraft} className="flex shrink-0 gap-2 border-t border-slate-200 bg-white p-3">
            <label className="sr-only" htmlFor="urjaa-chat-input">Ask about solar, subsidy or installation</label>
            <textarea id="urjaa-chat-input" aria-label="Ask about solar, subsidy or installation" value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={handleKeyDown} rows={1} placeholder="Ask about solar, subsidy or installation..." className="max-h-20 min-h-11 min-w-0 flex-1 resize-none rounded-xl border border-slate-200 px-3 py-3 text-[13px] text-[#0f2447] outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10" />
            <button type="submit" disabled={!draft.trim()} aria-label="Send message to WhatsApp" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0f2447] text-white transition hover:bg-[#0a1a34] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"><Send className="h-4 w-4" /></button>
          </form>
          <button type="button" onClick={() => sendToWhatsApp(draft)} className="flex min-h-[68px] shrink-0 items-center justify-between border-t border-emerald-600/20 bg-[#25D366] px-4 text-left text-[#063b1c] transition hover:bg-[#20bd5b] sm:px-5"><span><span className="block text-[11px] font-bold uppercase tracking-[0.12em]">Need site-specific help?</span><span className="mt-1 block text-xs font-medium text-[#145c32]">Continue with our team on WhatsApp</span></span><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/35"><ArrowRight className="h-4 w-4" /></span></button>
        </section>
      )}
      <button type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} aria-label={open ? 'Close Urjaa Solar Desk' : 'Open Urjaa Solar Desk'} className={`flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(15,36,71,0.2)] transition duration-200 hover:scale-105 hover:bg-[#20bd5b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300/40 ${isMobile ? 'h-14 w-14' : 'h-15 w-15'}`}>{open ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}</button>
    </div>
  )
}
