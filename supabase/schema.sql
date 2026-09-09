-- ============================================================
-- Urjaa Solar Energy — Supabase PostgreSQL Schema
-- Run this in the Supabase SQL Editor (Database → SQL Editor)
-- ============================================================

-- Enable UUID helper
create extension if not exists "uuid-ossp";

-- ============================================================
-- SHARED TRIGGER: auto-set updated_at
-- ============================================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================================
-- PROFILES  (extends auth.users — one row per Supabase user)
-- ============================================================
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  email       text,
  full_name   text,
  role        text not null default 'viewer'
              check (role in ('super_admin', 'admin', 'sales', 'support', 'viewer')),
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function update_updated_at();

-- Auto-create profile row when a new auth user signs up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================================
-- HELPER FUNCTIONS for RLS
-- ============================================================
create or replace function is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('super_admin', 'admin')
  );
$$ language sql security definer stable;

create or replace function is_staff()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('super_admin', 'admin', 'sales', 'support')
  );
$$ language sql security definer stable;

-- ============================================================
-- LEADS
-- ============================================================
create table if not exists public.leads (
  id                   uuid primary key default uuid_generate_v4(),
  name                 text not null,
  phone                text not null,
  email                text,
  city                 text,
  state                text,
  property_type        text,
  monthly_bill         numeric,
  interested_solution  text,
  message              text,
  source               text default 'contact_form',
  status               text default 'new'
                       check (status in ('new','contacted','qualified','survey','quotation','negotiation','won','lost','followup')),
  notes                text,
  assigned_to          uuid references public.profiles(id) on delete set null,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create index if not exists leads_status_idx      on public.leads(status);
create index if not exists leads_created_idx     on public.leads(created_at desc);
create index if not exists leads_phone_idx       on public.leads(phone);

drop trigger if exists leads_updated_at on public.leads;
create trigger leads_updated_at
  before update on public.leads
  for each row execute function update_updated_at();

-- ============================================================
-- CUSTOMER PORTAL
-- ============================================================
create table if not exists public.customer_accounts (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users(id) on delete cascade unique not null,
  lead_id     uuid references public.leads(id) on delete set null,
  phone       text,
  status      text default 'active' check (status in ('active', 'paused', 'closed')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.project_updates (
  id           uuid primary key default uuid_generate_v4(),
  customer_id  uuid references public.customer_accounts(id) on delete cascade not null,
  title        text not null,
  description  text,
  status       text default 'pending' check (status in ('pending', 'in_progress', 'complete')),
  sort_order   int default 0,
  created_at   timestamptz not null default now()
);

drop trigger if exists customer_accounts_updated_at on public.customer_accounts;
create trigger customer_accounts_updated_at
  before update on public.customer_accounts
  for each row execute function update_updated_at();

-- ============================================================
-- BLOG
-- ============================================================
create table if not exists public.blog_posts (
  id           uuid primary key default uuid_generate_v4(),
  title        text not null,
  slug         text unique not null,
  excerpt      text,
  content      text not null,
  cover_image  text,
  author       text default 'Urjaa Solar Energy',
  published_at timestamptz,
  is_published boolean default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ============================================================
-- CALCULATIONS  (solar calculator runs)
-- ============================================================
create table if not exists public.calculations (
  id          uuid primary key default uuid_generate_v4(),
  input       jsonb not null default '{}',
  result      jsonb not null default '{}',
  created_at  timestamptz not null default now()
);

create index if not exists calculations_created_idx on public.calculations(created_at desc);

-- ============================================================
-- CONTACT MESSAGES  (contact page form)
-- ============================================================
create table if not exists public.contact_messages (
  id             uuid primary key default uuid_generate_v4(),
  name           text,
  phone          text,
  email          text,
  city           text,
  property_type  text,
  monthly_bill   text,
  solution       text,
  message        text,
  source         text default 'contact_form',
  is_read        boolean default false,
  created_at     timestamptz not null default now()
);

-- ============================================================
-- SOLAR CALCULATOR SETTINGS  (admin-configurable calc params)
-- ============================================================
create table if not exists public.solar_calc_settings (
  id           uuid primary key default uuid_generate_v4(),
  key          text unique not null,
  value        jsonb not null,
  label        text,
  description  text,
  updated_at   timestamptz not null default now()
);

drop trigger if exists solar_calc_settings_updated_at on public.solar_calc_settings;
create trigger solar_calc_settings_updated_at
  before update on public.solar_calc_settings
  for each row execute function update_updated_at();

-- ============================================================
-- SITE SETTINGS  (admin-editable CMS settings)
-- ============================================================
create table if not exists public.site_settings (
  id          uuid primary key default uuid_generate_v4(),
  key         text unique not null,
  value       jsonb not null,
  category    text default 'general',
  updated_at  timestamptz not null default now()
);

drop trigger if exists site_settings_updated_at on public.site_settings;
create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function update_updated_at();

-- ============================================================
-- STATS  (homepage counters — admin editable)
-- ============================================================
create table if not exists public.stats (
  id          uuid primary key default uuid_generate_v4(),
  key         text unique not null,
  value       text not null,
  label       text not null,
  suffix      text default '',
  sort_order  int default 0,
  updated_at  timestamptz not null default now()
);

drop trigger if exists stats_updated_at on public.stats;
create trigger stats_updated_at
  before update on public.stats
  for each row execute function update_updated_at();

-- ============================================================
-- PRODUCTS
-- ============================================================
create table if not exists public.products (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  category        text not null,
  brand           text,
  model           text,
  capacity        text,
  efficiency      text,
  warranty        text,
  description     text,
  specifications  jsonb default '{}',
  image_url       text,
  datasheet_url   text,
  is_featured     boolean default false,
  is_active       boolean default true,
  sort_order      int default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists products_category_idx on public.products(category);
create index if not exists products_active_idx   on public.products(is_active);

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at
  before update on public.products
  for each row execute function update_updated_at();

-- ============================================================
-- PROJECTS  (case studies / portfolio)
-- ============================================================
create table if not exists public.projects (
  id                    uuid primary key default uuid_generate_v4(),
  title                 text not null,
  location              text,
  state                 text,
  capacity_kw           numeric,
  system_type           text,
  customer_type         text
                        check (customer_type in ('residential','commercial','industrial','agricultural','institutional')),
  annual_generation_kwh numeric,
  estimated_savings_pa  numeric,
  completion_date       date,
  duration_days         int,
  description           text,
  components            jsonb default '[]',
  images                jsonb default '[]',
  is_featured           boolean default false,
  is_published          boolean default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists projects_type_idx      on public.projects(customer_type);
create index if not exists projects_published_idx on public.projects(is_published);

drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at
  before update on public.projects
  for each row execute function update_updated_at();

-- ============================================================
-- TESTIMONIALS
-- ============================================================
create table if not exists public.testimonials (
  id             uuid primary key default uuid_generate_v4(),
  customer_name  text not null,
  location       text,
  system_type    text,
  rating         int check (rating between 1 and 5),
  testimonial    text not null,
  project_id     uuid references public.projects(id) on delete set null,
  is_active      boolean default true,
  sort_order     int default 0,
  created_at     timestamptz not null default now()
);

-- ============================================================
-- FAQs
-- ============================================================
create table if not exists public.faqs (
  id          uuid primary key default uuid_generate_v4(),
  category    text not null,
  question    text not null,
  answer      text not null,
  sort_order  int default 0,
  is_active   boolean default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists faqs_category_idx on public.faqs(category);

drop trigger if exists faqs_updated_at on public.faqs;
create trigger faqs_updated_at
  before update on public.faqs
  for each row execute function update_updated_at();

-- ============================================================
-- SUBSIDY PROGRAMS
-- ============================================================
create table if not exists public.subsidy_programs (
  id                 uuid primary key default uuid_generate_v4(),
  program_name       text not null,
  state              text default 'All India',
  description        text,
  eligibility        text,
  benefit_structure  jsonb default '[]',
  max_benefit        text,
  effective_from     date,
  effective_until    date,
  official_source_url text,
  status             text default 'active'
                     check (status in ('active', 'inactive', 'expired')),
  last_verified_at   timestamptz,
  verification_note  text,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

drop trigger if exists subsidy_updated_at on public.subsidy_programs;
create trigger subsidy_updated_at
  before update on public.subsidy_programs
  for each row execute function update_updated_at();

-- ============================================================
-- TEAM MEMBERS
-- ============================================================
create table if not exists public.team_members (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  title        text,
  bio          text,
  image_url    text,
  linkedin_url text,
  is_active    boolean default true,
  sort_order   int default 0,
  created_at   timestamptz not null default now()
);

-- ============================================================
-- CERTIFICATIONS
-- ============================================================
create table if not exists public.certifications (
  id                uuid primary key default uuid_generate_v4(),
  name              text not null,
  issuing_body      text,
  certificate_number text,
  issue_date        date,
  expiry_date       date,
  document_url      text,
  is_active         boolean default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

drop trigger if exists certs_updated_at on public.certifications;
create trigger certs_updated_at
  before update on public.certifications
  for each row execute function update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Safe to rerun: replace policies with the current definitions below.
do $$
begin
  drop policy if exists "profiles_self_read" on public.profiles;
  drop policy if exists "profiles_admin_modify" on public.profiles;
  drop policy if exists "customer_self_read" on public.customer_accounts;
  drop policy if exists "customer_admin_write" on public.customer_accounts;
  drop policy if exists "updates_customer_read" on public.project_updates;
  drop policy if exists "updates_admin_write" on public.project_updates;
  drop policy if exists "blog_public_read" on public.blog_posts;
  drop policy if exists "blog_admin_write" on public.blog_posts;
  drop policy if exists "leads_public_insert" on public.leads;
  drop policy if exists "leads_staff_all" on public.leads;
  drop policy if exists "calc_public_insert" on public.calculations;
  drop policy if exists "calc_admin_read" on public.calculations;
  drop policy if exists "contact_public_insert" on public.contact_messages;
  drop policy if exists "contact_staff_all" on public.contact_messages;
  drop policy if exists "calc_settings_public_read" on public.solar_calc_settings;
  drop policy if exists "calc_settings_admin_write" on public.solar_calc_settings;
  drop policy if exists "site_settings_public_read" on public.site_settings;
  drop policy if exists "site_settings_admin_write" on public.site_settings;
  drop policy if exists "stats_public_read" on public.stats;
  drop policy if exists "stats_admin_write" on public.stats;
  drop policy if exists "products_public_read" on public.products;
  drop policy if exists "products_admin_write" on public.products;
  drop policy if exists "projects_public_read" on public.projects;
  drop policy if exists "projects_admin_write" on public.projects;
  drop policy if exists "testimonials_public_read" on public.testimonials;
  drop policy if exists "testimonials_admin_write" on public.testimonials;
  drop policy if exists "faqs_public_read" on public.faqs;
  drop policy if exists "faqs_admin_write" on public.faqs;
  drop policy if exists "subsidy_public_read" on public.subsidy_programs;
  drop policy if exists "subsidy_admin_write" on public.subsidy_programs;
  drop policy if exists "team_public_read" on public.team_members;
  drop policy if exists "team_admin_write" on public.team_members;
  drop policy if exists "certs_public_read" on public.certifications;
  drop policy if exists "certs_admin_write" on public.certifications;
end $$;

-- profiles
alter table public.profiles enable row level security;
create policy "profiles_self_read"    on public.profiles for select using (auth.uid() = id or is_staff());
create policy "profiles_admin_modify" on public.profiles for all    using (is_admin());

alter table public.customer_accounts enable row level security;
create policy "customer_self_read" on public.customer_accounts for select using (user_id = auth.uid() or is_admin());
create policy "customer_admin_write" on public.customer_accounts for all using (is_admin());

alter table public.project_updates enable row level security;
create policy "updates_customer_read" on public.project_updates for select using (exists (select 1 from public.customer_accounts c where c.id = customer_id and (c.user_id = auth.uid() or is_admin())));
create policy "updates_admin_write" on public.project_updates for all using (is_admin());

alter table public.blog_posts enable row level security;
create policy "blog_public_read" on public.blog_posts for select using (is_published = true or is_admin());
create policy "blog_admin_write" on public.blog_posts for all using (is_admin());

-- leads: anyone can insert (public form), staff reads/updates
alter table public.leads enable row level security;
create policy "leads_public_insert" on public.leads for insert with check (true);
create policy "leads_staff_all"     on public.leads for all    using (is_staff());

-- calculations: public insert, admin reads
alter table public.calculations enable row level security;
create policy "calc_public_insert" on public.calculations for insert with check (true);
create policy "calc_admin_read"    on public.calculations for select using (is_admin());

-- contact_messages: public insert, staff reads
alter table public.contact_messages enable row level security;
create policy "contact_public_insert" on public.contact_messages for insert with check (true);
create policy "contact_staff_all"     on public.contact_messages for all    using (is_staff());

-- solar_calc_settings: public read (powers the calculator), admin writes
alter table public.solar_calc_settings enable row level security;
create policy "calc_settings_public_read"  on public.solar_calc_settings for select using (true);
create policy "calc_settings_admin_write"  on public.solar_calc_settings for all    using (is_admin());

-- site_settings: public read, admin writes
alter table public.site_settings enable row level security;
create policy "site_settings_public_read"  on public.site_settings for select using (true);
create policy "site_settings_admin_write"  on public.site_settings for all    using (is_admin());

-- stats: public read, admin writes
alter table public.stats enable row level security;
create policy "stats_public_read"  on public.stats for select using (true);
create policy "stats_admin_write"  on public.stats for all    using (is_admin());

-- products: active products are public, admin manages all
alter table public.products enable row level security;
create policy "products_public_read"  on public.products for select using (is_active = true or is_admin());
create policy "products_admin_write"  on public.products for all    using (is_admin());

-- projects: published projects are public, admin manages all
alter table public.projects enable row level security;
create policy "projects_public_read"  on public.projects for select using (is_published = true or is_admin());
create policy "projects_admin_write"  on public.projects for all    using (is_admin());

-- testimonials: active ones are public
alter table public.testimonials enable row level security;
create policy "testimonials_public_read"  on public.testimonials for select using (is_active = true or is_admin());
create policy "testimonials_admin_write"  on public.testimonials for all    using (is_admin());

-- faqs: active ones are public
alter table public.faqs enable row level security;
create policy "faqs_public_read"  on public.faqs for select using (is_active = true or is_admin());
create policy "faqs_admin_write"  on public.faqs for all    using (is_admin());

-- subsidy_programs: active ones are public
alter table public.subsidy_programs enable row level security;
create policy "subsidy_public_read"  on public.subsidy_programs for select using (status = 'active' or is_admin());
create policy "subsidy_admin_write"  on public.subsidy_programs for all    using (is_admin());

-- team_members: active are public
alter table public.team_members enable row level security;
create policy "team_public_read"  on public.team_members for select using (is_active = true or is_admin());
create policy "team_admin_write"  on public.team_members for all    using (is_admin());

-- certifications: active are public
alter table public.certifications enable row level security;
create policy "certs_public_read"  on public.certifications for select using (is_active = true or is_admin());
create policy "certs_admin_write"  on public.certifications for all    using (is_admin());
