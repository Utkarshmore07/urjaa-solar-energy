'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, ArrowRight, ShieldCheck, Mail } from 'lucide-react'
import { Toaster, toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Logo from '@/components/site/Logo'
import { getSupabaseClient } from '@/lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await getSupabaseClient().auth.signInWithPassword({ email, password: pwd })
      if (error) {
        toast.error(error.message || 'Invalid credentials')
      } else {
        router.replace('/admin')
      }
    } catch { toast.error('Network error') } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-5">
      <Toaster position="top-center" richColors />
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8"><Logo /></div>
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="h-10 w-10 rounded-md bg-[#0f2447] text-white flex items-center justify-center mb-4">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="font-display text-2xl font-bold text-[#0f2447]">Admin sign in</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in with your admin Supabase credentials.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="email" autoFocus required
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="pl-9 h-11" placeholder="admin@example.com"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs font-medium text-slate-600 uppercase tracking-wider">Password</Label>
              <Input
                type="password" required
                value={pwd} onChange={e => setPwd(e.target.value)}
                className="mt-1.5 h-11" placeholder="••••••••••••"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 bg-[#0f2447] hover:bg-[#0a1a34] text-white font-medium">
              {loading ? 'Signing in…' : <><span>Sign in</span> <ArrowRight className="h-4 w-4 ml-2" /></>}
            </Button>
          </form>
          <div className="mt-6 pt-5 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure area — authorised personnel only.
          </div>
        </div>
      </div>
    </div>
  )
}
