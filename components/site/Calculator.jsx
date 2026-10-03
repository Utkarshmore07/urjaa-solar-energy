'use client'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Cpu, ClipboardCheck, FileText, MessageCircle, ArrowRight, Gauge, TrendingUp, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { generateQuotePDF } from '@/lib/generatePDF'
import { calculateEstimate, SOLAR_ESTIMATE_STATES } from '@/lib/solar-estimates'
import { SITE } from '@/lib/site-config'

export default function Calculator({ standalone = false }) {
  const [state, setState] = useState('Maharashtra')
  const [city, setCity] = useState('Mumbai')
  const [bill, setBill] = useState(3500)
  const [roof, setRoof] = useState(500)
  const [consumerType, setConsumerType] = useState('residential')
  const [roofType, setRoofType] = useState('RCC')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pdfOpen, setPdfOpen] = useState(false)
  const [pdfForm, setPdfForm] = useState({ name: '', phone: '', email: '' })
  const [pdfLoading, setPdfLoading] = useState(false)

  const compute = () => {
    const input = { state, city, monthlyBill: bill, roofArea: roof, consumerType, roofType }
    setResult(calculateEstimate(input))
    setLoading(true)
    fetch('/api/calculate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) }).catch(() => {})
    setLoading(false)
  }
  useEffect(() => { compute() }, []) // eslint-disable-line

  const chartData = useMemo(() => {
    if (!result) return []
    let cum = -result.netCost
    return Array.from({ length: 25 }, (_, i) => {
      cum += result.annualSavings * (1 + i * 0.02)
      return { year: `Y${i + 1}`, cumulative: Math.round(cum) }
    })
  }, [result])

  const handleWhatsapp = () => {
    if (!result) return
    const msg = `Hi Urjaa Solar,\n\nI'd like a quote based on my calculator estimate:\n- Location: ${city}, ${state}\n- Monthly Bill: ₹${bill.toLocaleString('en-IN')}\n- Roof Area: ${roof} sqft\n- Type: ${consumerType}\n\nSystem estimated: ${result.kw} kW\nExpected monthly saving: ₹${result.monthlySavings.toLocaleString('en-IN')}\n\nPlease share a detailed quotation.`
    window.open(SITE.whatsappMsg(msg), '_blank')
  }

  return (
    <div className={standalone ? '' : 'relative'}>
      <div className="grid lg:grid-cols-12 gap-5">
        <div className="lg:col-span-4 rounded-xl bg-white border border-slate-200 p-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#0f2447] mb-4">
            <Cpu className="h-4 w-4" /> Your Details
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Consumer Type</Label>
              <Select value={consumerType} onValueChange={setConsumerType}>
                <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">State</Label>
                <Select value={state} onValueChange={setState}>
                  <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>{SOLAR_ESTIMATE_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">City</Label>
                <Input className="mt-1.5 h-11" value={city} onChange={e => setCity(e.target.value)} />
              </div>
            </div>
            <div>
              <div className="flex justify-between"><Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Monthly Bill</Label><span className="font-semibold text-[#0f2447] text-sm">₹{bill.toLocaleString('en-IN')}</span></div>
              <Slider className="mt-3" min={500} max={100000} step={500} value={[bill]} onValueChange={(v) => setBill(v[0])} />
            </div>
            <div>
              <div className="flex justify-between"><Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Roof Area (sqft)</Label><span className="font-semibold text-[#0f2447] text-sm">{roof}</span></div>
              <Slider className="mt-3" min={100} max={20000} step={50} value={[roof]} onValueChange={(v) => setRoof(v[0])} />
            </div>
            <div>
              <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Roof Type</Label>
              <Select value={roofType} onValueChange={setRoofType}>
                <SelectTrigger className="mt-1.5 h-11"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="RCC">RCC (Concrete)</SelectItem>
                  <SelectItem value="Metal">Metal Sheet</SelectItem>
                  <SelectItem value="Tile">Tile / Sloped</SelectItem>
                  <SelectItem value="Ground">Ground Mount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={compute} disabled={loading} className="w-full h-11 bg-[#0f2447] hover:bg-[#0a1a34] text-white font-medium">
              {loading ? 'Calculating…' : <>Recalculate <Gauge className="h-4 w-4 ml-2" /></>}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'System Size', v: result ? `${result.kw} kW` : '—' },
              { label: 'Net Investment', v: result ? `₹${result.netCost.toLocaleString('en-IN')}` : '—' },
              { label: 'Govt. Subsidy', v: result ? `₹${result.subsidy.toLocaleString('en-IN')}` : '—' },
              { label: 'Payback Period', v: result ? `${result.payback} yrs` : '—' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl bg-white border border-slate-200 p-4">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">{s.label}</div>
                <div className="font-display font-bold text-xl lg:text-2xl mt-1 text-[#0f2447]">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-[#0f2447]">25-Year Cumulative Savings</div>
              {result && <div className="text-xs text-slate-500">Break-even at year <span className="font-semibold text-[#0f2447]">{result.payback}</span></div>}
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#0f2447" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0f2447" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#64748b' }} interval={2} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                  <Tooltip formatter={(v) => `₹${Number(v).toLocaleString('en-IN')}`} />
                  <Area type="monotone" dataKey="cumulative" stroke="#0f2447" strokeWidth={2} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-white border border-slate-200 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0f2447] mb-2"><TrendingUp className="h-4 w-4" /> Monthly Savings</div>
              <div className="font-display text-2xl font-bold text-[#0f2447]">{result ? `₹${result.monthlySavings.toLocaleString('en-IN')}` : '—'}</div>
              <div className="text-xs text-slate-500 mt-1">Vs current bill ₹{bill.toLocaleString('en-IN')}</div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                  <div className="text-slate-500">Annual Units</div>
                  <div className="font-semibold text-[#0f2447]">{result ? `${result.annualUnits.toLocaleString('en-IN')} kWh` : '—'}</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                  <div className="text-slate-500">25-Yr Savings</div>
                  <div className="font-semibold text-[#0f2447]">{result ? `₹${(result.twentyFiveYearSavings / 100000).toFixed(1)}L` : '—'}</div>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0f2447] mb-2"><Leaf className="h-4 w-4" /> Environmental Impact</div>
              <div className="font-display text-2xl font-bold text-[#0f2447]">{result ? `${(result.co2Kg / 1000).toFixed(1)} tonnes` : '—'}</div>
              <div className="text-xs text-slate-500 mt-1">CO₂ offset per year</div>
              <div className="mt-3 text-xs text-slate-600">Equivalent to <span className="font-semibold text-[#0f2447]">{result ? Math.round(result.co2Kg / 22) : 0}</span> trees planted every year</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => setPdfOpen(true)} disabled={!result} className="flex-1 h-11 bg-[#0f2447] hover:bg-[#0a1a34] text-white font-medium">
              <FileText className="h-4 w-4 mr-2" /> Download PDF Quote
            </Button>
            <Button onClick={handleWhatsapp} disabled={!result} variant="outline" className="flex-1 h-11 border-[#25D366] text-[#128C7E] hover:bg-[#25D366]/5 font-medium">
              <MessageCircle className="h-4 w-4 mr-2" /> Send to WhatsApp
            </Button>
          </div>
          <p className="text-[11px] text-slate-500 text-center">
            Note: These are estimates. Actual figures depend on site inspection, shadow analysis, panel brand and local DISCOM policies.
          </p>
        </div>
      </div>

      <Dialog open={pdfOpen} onOpenChange={setPdfOpen}>
        <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden gap-0">
          <div className="bg-[#0f2447] p-6 text-white">
            <div className="h-11 w-11 rounded-lg bg-white/10 flex items-center justify-center mb-3">
              <FileText className="h-5 w-5" />
            </div>
            <DialogTitle className="font-display text-xl font-semibold">Download your quotation</DialogTitle>
            <DialogDescription className="text-white/70 text-sm mt-1.5">
              A formal PDF quotation will be generated with your system estimate. Please share your details so we can follow up.
            </DialogDescription>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Full Name *</Label>
              <Input className="mt-1.5 h-11" placeholder="Your name" value={pdfForm.name} onChange={e => setPdfForm({ ...pdfForm, name: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Phone *</Label>
              <Input className="mt-1.5 h-11" placeholder="10-digit mobile" value={pdfForm.phone} onChange={e => setPdfForm({ ...pdfForm, phone: e.target.value })} />
            </div>
            <div>
              <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Email (optional)</Label>
              <Input className="mt-1.5 h-11" type="email" placeholder="you@email.com" value={pdfForm.email} onChange={e => setPdfForm({ ...pdfForm, email: e.target.value })} />
            </div>
            <Button
              disabled={pdfLoading}
              onClick={async () => {
                if (!pdfForm.name || !pdfForm.phone) { toast.error('Please add name & phone'); return }
                setPdfLoading(true)
                try {
                  const gen = generateQuotePDF({
                    customer: pdfForm,
                    input: { state, city, monthlyBill: bill, roofArea: roof, consumerType, roofType },
                    result,
                  })
                  fetch('/api/lead', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...pdfForm, city, source: 'pdf_quote',
                      calculation: { input: { state, city, monthlyBill: bill, roofArea: roof, consumerType }, result } }),
                  }).catch(() => {})
                  toast.success(`Quotation ${gen.quoteId} downloaded. We'll be in touch shortly.`)
                  setPdfOpen(false); setPdfForm({ name: '', phone: '', email: '' })
                } catch { toast.error('Could not generate PDF') } finally { setPdfLoading(false) }
              }}
              className="w-full h-11 bg-[#0f2447] hover:bg-[#0a1a34] text-white font-medium"
            >
              {pdfLoading ? 'Generating…' : <>Download PDF <ArrowRight className="h-4 w-4 ml-2" /></>}
            </Button>
            <p className="text-[11px] text-slate-500 text-center">Your details are used only to prepare a formal quotation.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
