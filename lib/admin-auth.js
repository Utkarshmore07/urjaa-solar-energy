'use client'
import { getSupabaseClient } from './supabase'

export async function getAdminSession() {
  const { data: { session } } = await getSupabaseClient().auth.getSession()
  return session
}

export async function signOut() {
  await getSupabaseClient().auth.signOut()
}

export async function adminFetch(url, opts = {}) {
  const session = await getAdminSession()
  const token = session?.access_token
  if (!token) {
    if (typeof window !== 'undefined') window.location.href = '/admin/login'
    throw new Error('Unauthorized')
  }
  const headers = {
    ...(opts.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    Authorization: `Bearer ${token}`,
    ...(opts.headers || {}),
  }
  const r = await fetch(url, { ...opts, headers })
  if (r.status === 401) {
    await signOut()
    if (typeof window !== 'undefined') window.location.href = '/admin/login'
    throw new Error('Unauthorized')
  }
  if (r.status === 403) {
    throw new Error('Your account does not have admin or staff access.')
  }
  return r
}

// Legacy shims — kept so existing pages that import these don't break
export async function getAdminToken() {
  const session = await getAdminSession()
  return session?.access_token || null
}
export function setAdminToken() {}   // no-op — Supabase manages session
export function clearAdminToken() { signOut() }
