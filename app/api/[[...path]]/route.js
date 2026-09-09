import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars')
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
}

function cors(res) {
  res.headers.set('Access-Control-Allow-Origin', '*')
  res.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return res
}
export async function OPTIONS() { return cors(new NextResponse(null, { status: 204 })) }

function subsidyFor(kw) {
  if (kw <= 1) return 30000
  if (kw <= 2) return 60000
  return 78000
}

function calc(input) {
  const { monthlyBill = 3000, roofArea = 500, consumerType = 'residential', state = 'Delhi' } = input || {}
  const stateRateMap = { Delhi: 8, Maharashtra: 9, Karnataka: 8.5, Gujarat: 7.5, 'Uttar Pradesh': 7, 'Tamil Nadu': 7.5, Rajasthan: 7, Haryana: 7.2, 'Madhya Pradesh': 7, Punjab: 7.5, Telangana: 8, Kerala: 7 }
  const rate = stateRateMap[state] || 7.5
  const monthlyUnits = Math.max(50, Math.round(monthlyBill / rate))
  const dailyUnits = monthlyUnits / 30
  const rawKw = dailyUnits / 4
  const areaKw = roofArea / 100
  const systemKw = Math.max(1, Math.min(rawKw, areaKw))
  const kw = Math.round(systemKw * 10) / 10
  const costPerKw = consumerType === 'residential' ? 65000 : (consumerType === 'commercial' ? 55000 : 50000)
  const grossCost = Math.round(kw * costPerKw)
  const subsidy = consumerType === 'residential' ? subsidyFor(kw) : 0
  const netCost = grossCost - subsidy
  const annualUnits = Math.round(kw * 4 * 365)
  const annualSavings = Math.round(annualUnits * rate)
  const monthlySavings = Math.round(annualSavings / 12)
  const payback = Math.round((netCost / annualSavings) * 10) / 10
  const twentyFive = Math.round(annualSavings * 25 * 1.05)
  const co2 = Math.round(annualUnits * 0.82)
  const roi = Math.round((twentyFive - netCost) / netCost * 100)
  return { kw, grossCost, subsidy, netCost, annualUnits, annualSavings, monthlySavings, payback, twentyFiveYearSavings: twentyFive, co2Kg: co2, roiPercent: roi, rate }
}

// Verify admin JWT via Supabase service role — never trust client-supplied role
async function verifyAdmin(request) {
  const auth = request.headers.get('authorization') || ''
  const token = auth.replace('Bearer ', '').trim()
  if (!token) return null
  try {
    const db = getDb()
    const { data: { user }, error } = await db.auth.getUser(token)
    if (error || !user) return null
    const { data: profile } = await db.from('profiles').select('role').eq('id', user.id).single()
    const allowed = ['super_admin', 'admin', 'sales', 'support']
    if (!profile || !allowed.includes(profile.role)) return null
    return user
  } catch { return null }
}

async function verifyUser(request) {
  const auth = request.headers.get('authorization') || ''
  const token = auth.replace('Bearer ', '').trim()
  if (!token) return null
  try {
    const { data: { user }, error } = await getDb().auth.getUser(token)
    return error || !user ? null : user
  } catch { return null }
}

async function handler(request, ctx) {
  const params = await ctx.params
  const path = (params?.path || []).join('/')
  const method = request.method
  try {
    if (path === 'health') {
      return cors(NextResponse.json({ status: 'ok', backend: 'supabase' }))
    }

    const db = getDb()

    // ===== Public endpoints =====

    if (path === 'calculate' && method === 'POST') {
      const body = await request.json().catch(() => ({}))
      const result = calc(body)
      // Fire-and-forget: don't block the response for analytics insert
      db.from('calculations').insert({ input: body, result }).then(() => {})
      return cors(NextResponse.json({ ok: true, result }))
    }

    if (path === 'lead' && method === 'POST') {
      const body = await request.json()
      const { error } = await db.from('leads').insert({
        name: String(body.name || '').slice(0, 200),
        phone: String(body.phone || '').slice(0, 20),
        email: String(body.email || '').slice(0, 200),
        city: String(body.city || '').slice(0, 100),
        interested_solution: String(body.interest || '').slice(0, 100),
        message: String(body.message || '').slice(0, 2000),
        source: String(body.source || 'contact').slice(0, 50),
        status: 'new',
      })
      if (error) throw error
      return cors(NextResponse.json({ ok: true }))
    }

    if (path === 'contact' && method === 'POST') {
      const body = await request.json()
      const { error } = await db.from('contact_messages').insert({
        name: String(body.name || '').slice(0, 200),
        phone: String(body.phone || '').slice(0, 20),
        email: String(body.email || '').slice(0, 200),
        city: String(body.city || '').slice(0, 100),
        property_type: String(body.propertyType || '').slice(0, 100),
        monthly_bill: String(body.monthlyBill || '').slice(0, 50),
        solution: String(body.solution || '').slice(0, 100),
        message: String(body.message || '').slice(0, 2000),
        source: 'contact_form',
      })
      if (error) throw error
      return cors(NextResponse.json({ ok: true }))
    }

    if (path === 'settings' && method === 'GET') {
      const { data } = await db.from('site_settings').select('key, value')
      const settings = {}
      for (const row of data || []) settings[row.key] = row.value
      return cors(NextResponse.json({ ok: true, settings }))
    }

    if (path === 'stats' && method === 'GET') {
      const { data } = await db.from('stats').select('key, value, label, suffix').order('sort_order')
      return cors(NextResponse.json({ ok: true, stats: data || [] }))
    }

    if (path === 'products' && method === 'GET') {
      const { data, error } = await db.from('products').select('*').eq('is_active', true).order('sort_order').order('created_at', { ascending: false })
      if (error) throw error
      return cors(NextResponse.json({ ok: true, items: data || [] }))
    }

    // ===== Admin endpoints — require valid Supabase JWT =====

    if (path.startsWith('admin/')) {
      const user = await verifyAdmin(request)
      if (!user) return cors(NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 }))

      if (path === 'admin/stats' && method === 'GET') {
        const [
          { count: leads },
          { count: calcs },
          { data: recent },
          { data: allSources },
        ] = await Promise.all([
          db.from('leads').select('*', { count: 'exact', head: true }),
          db.from('calculations').select('*', { count: 'exact', head: true }),
          db.from('leads').select('id,name,phone,email,city,source,status,created_at').order('created_at', { ascending: false }).limit(5),
          db.from('leads').select('source'),
        ])
        const bySource = Object.entries(
          (allSources || []).reduce((acc, l) => {
            const s = l.source || 'contact'
            acc[s] = (acc[s] || 0) + 1
            return acc
          }, {})
        ).map(([_id, count]) => ({ _id, count }))
        return cors(NextResponse.json({ ok: true, leads, calcs, recent, bySource }))
      }

      if (path === 'admin/leads' && method === 'GET') {
        const { data, error } = await db.from('leads').select('*').order('created_at', { ascending: false }).limit(500)
        if (error) throw error
        return cors(NextResponse.json({ ok: true, items: data }))
      }

      if (path.startsWith('admin/leads/') && method === 'DELETE') {
        const id = path.split('/')[2]
        const { error } = await db.from('leads').delete().eq('id', id)
        if (error) throw error
        return cors(NextResponse.json({ ok: true }))
      }

      if (path.startsWith('admin/leads/') && method === 'PUT') {
        const id = path.split('/')[2]
        const body = await request.json()
        const { error } = await db.from('leads').update({
          ...(body.status !== undefined && { status: body.status }),
          ...(body.notes !== undefined && { notes: String(body.notes).slice(0, 2000) }),
        }).eq('id', id)
        if (error) throw error
        return cors(NextResponse.json({ ok: true }))
      }

      if (path === 'admin/calculations' && method === 'GET') {
        const { data, error } = await db.from('calculations').select('*').order('created_at', { ascending: false }).limit(500)
        if (error) throw error
        return cors(NextResponse.json({ ok: true, items: data }))
      }

      if (path === 'admin/products' && method === 'GET') {
        const { data, error } = await db.from('products').select('*').order('sort_order').order('created_at', { ascending: false })
        if (error) throw error
        return cors(NextResponse.json({ ok: true, items: data || [] }))
      }

      if (path === 'admin/customers' && method === 'POST') {
        const body = await request.json()
        const email = String(body.email || '').trim().toLowerCase()
        const password = String(body.password || '')
        if (!email || password.length < 8) return cors(NextResponse.json({ ok: false, error: 'Valid email and 8-character password required' }, { status: 400 }))
        const { data: created, error: createError } = await db.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { full_name: body.name || '' } })
        if (createError) {
          const duplicate = /already been registered|already exists/i.test(createError.message || '')
          return cors(NextResponse.json({ ok: false, error: duplicate ? 'A user with this email already exists. Use a different email or reset the existing account.' : createError.message }, { status: duplicate ? 409 : 400 }))
        }
        const { data: account, error: accountError } = await db.from('customer_accounts').insert({ user_id: created.user.id, lead_id: body.lead_id || null, phone: String(body.phone || '').slice(0, 20) }).select().single()
        if (accountError) throw accountError
        return cors(NextResponse.json({ ok: true, item: account }))
      }

      if (path === 'admin/customers' && method === 'GET') {
        const { data, error } = await db.from('customer_accounts').select('*, project_updates(*)').order('created_at', { ascending: false })
        if (error) throw error
        return cors(NextResponse.json({ ok: true, items: data || [] }))
      }

      if (path.startsWith('admin/customers/') && path.endsWith('/updates') && method === 'POST') {
        const customerId = path.split('/')[2]
        const body = await request.json()
        const { data, error } = await db.from('project_updates').insert({ customer_id: customerId, title: String(body.title || '').slice(0, 160), description: String(body.description || '').slice(0, 2000), status: body.status || 'pending', sort_order: Number(body.sort_order || 0) }).select().single()
        if (error) throw error
        return cors(NextResponse.json({ ok: true, item: data }))
      }

      if (path === 'admin/products' && method === 'POST') {
        const body = await request.json()
        const { data, error } = await db.from('products').insert({
          name: String(body.name || '').slice(0, 160),
          category: String(body.category || 'solar-panels').slice(0, 80),
          brand: String(body.brand || '').slice(0, 100),
          model: String(body.model || '').slice(0, 100),
          capacity: String(body.capacity || '').slice(0, 80),
          efficiency: String(body.efficiency || '').slice(0, 80),
          warranty: String(body.warranty || '').slice(0, 120),
          description: String(body.description || '').slice(0, 2000),
          image_url: String(body.image_url || '').slice(0, 500),
          is_featured: Boolean(body.is_featured),
          is_active: body.is_active !== false,
          sort_order: Number(body.sort_order || 0),
        }).select().single()
        if (error) throw error
        return cors(NextResponse.json({ ok: true, item: data }))
      }

      if (path.startsWith('admin/products/') && (method === 'PUT' || method === 'DELETE')) {
        const id = path.split('/')[2]
        if (method === 'DELETE') {
          const { error } = await db.from('products').delete().eq('id', id)
          if (error) throw error
          return cors(NextResponse.json({ ok: true }))
        }
        const body = await request.json()
        const { data, error } = await db.from('products').update({
          ...(body.name !== undefined && { name: String(body.name).slice(0, 160) }),
          ...(body.category !== undefined && { category: String(body.category).slice(0, 80) }),
          ...(body.brand !== undefined && { brand: String(body.brand).slice(0, 100) }),
          ...(body.model !== undefined && { model: String(body.model).slice(0, 100) }),
          ...(body.capacity !== undefined && { capacity: String(body.capacity).slice(0, 80) }),
          ...(body.efficiency !== undefined && { efficiency: String(body.efficiency).slice(0, 80) }),
          ...(body.warranty !== undefined && { warranty: String(body.warranty).slice(0, 120) }),
          ...(body.description !== undefined && { description: String(body.description).slice(0, 2000) }),
          ...(body.image_url !== undefined && { image_url: String(body.image_url).slice(0, 500) }),
          ...(body.is_featured !== undefined && { is_featured: Boolean(body.is_featured) }),
          ...(body.is_active !== undefined && { is_active: Boolean(body.is_active) }),
          ...(body.sort_order !== undefined && { sort_order: Number(body.sort_order || 0) }),
        }).eq('id', id).select().single()
        if (error) throw error
        return cors(NextResponse.json({ ok: true, item: data }))
      }

      if (path === 'admin/settings' && method === 'GET') {
        const { data } = await db.from('site_settings').select('key, value, category')
        const settings = {}
        for (const row of data || []) settings[row.key] = row.value
        return cors(NextResponse.json({ ok: true, settings }))
      }

      if (path === 'admin/settings' && method === 'PUT') {
        const body = await request.json()
        const upserts = Object.entries(body).map(([key, value]) => ({ key, value }))
        const { error } = await db.from('site_settings').upsert(upserts, { onConflict: 'key' })
        if (error) throw error
        return cors(NextResponse.json({ ok: true }))
      }

      if (path === 'admin/export/leads' && method === 'GET') {
        const { data } = await db.from('leads').select('*').order('created_at', { ascending: false })
        const header = ['created_at','name','phone','email','city','interested_solution','source','status','message']
        const rows = (data || []).map(x => header.map(k => JSON.stringify(x[k] ?? '')).join(','))
        const csv = header.join(',') + '\n' + rows.join('\n')
        return new NextResponse(csv, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=urjaa-leads.csv',
            'Access-Control-Allow-Origin': '*',
          },
        })
      }
    }

    if (path === 'customer/portal' && method === 'GET') {
      const user = await verifyUser(request)
      if (!user) return cors(NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 }))
      const { data: account, error } = await db.from('customer_accounts').select('*, project_updates(*)').eq('user_id', user.id).single()
      if (error) throw error
      return cors(NextResponse.json({ ok: true, account }))
    }

    return cors(NextResponse.json({ ok: true, message: 'Urjaa Solar API', path, method }))
  } catch (e) {
    console.error('[API]', path, e?.message)
    // Never expose internal error details to the client
    return cors(NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 }))
  }
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
