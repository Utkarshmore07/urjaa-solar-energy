import { createClient } from '@supabase/supabase-js'

// Singleton browser client — safe to import in 'use client' components
let _client

export function getSupabaseClient() {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  }
  return _client
}
