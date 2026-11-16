'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, LockKeyhole } from 'lucide-react'
import { getSupabaseClient } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CustomerLogin() {
  const router = useRouter(); const [identifier, setIdentifier] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  const submit = async (event) => { event.preventDefault(); setLoading(true); setError(''); const credentials = identifier.includes('@') ? { email: identifier, password } : { phone: identifier, password }; const { error: authError } = await getSupabaseClient().auth.signInWithPassword(credentials); if (authError) setError(authError.message); else router.replace('/customer'); setLoading(false) }
  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5"><form onSubmit={submit} className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-7 shadow-sm"><Link href="/" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#0f2447]"><ArrowLeft className="h-3.5 w-3.5" /> Back to website</Link><div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f2447] text-white"><LockKeyhole className="h-5 w-5" /></div><h1 className="font-display text-2xl font-bold text-[#0f2447]">Customer project portal</h1><p className="mt-2 text-sm text-slate-500">Sign in with the email or phone linked to your project. Your team will provide access after your deal is confirmed.</p><label className="mt-6 block text-xs font-semibold uppercase tracking-wider text-slate-600">Email or phone<Input required className="mt-1.5" value={identifier} onChange={event => setIdentifier(event.target.value)} /></label><label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-slate-600">Password<Input required type="password" className="mt-1.5" value={password} onChange={event => setPassword(event.target.value)} /></label>{error && <p className="mt-4 text-sm text-red-600">{error}</p>}<Button disabled={loading} className="mt-6 w-full bg-[#0f2447] text-white">{loading ? 'Signing in…' : 'Sign in'}</Button></form></main>
}
