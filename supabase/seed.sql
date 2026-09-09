-- ============================================================
-- Urjaa Solar Energy — Supabase Seed Data
-- Run AFTER schema.sql in the Supabase SQL Editor
-- ============================================================

-- ============================================================
-- SOLAR CALCULATOR SETTINGS  (default calculation parameters)
-- ============================================================
insert into public.solar_calc_settings (key, value, label, description) values
  ('cost_per_kw_residential', '65000',   'Cost per kW — Residential (₹)', 'Installed cost per kWp for residential systems'),
  ('cost_per_kw_commercial',  '55000',   'Cost per kW — Commercial (₹)',  'Installed cost per kWp for commercial systems'),
  ('cost_per_kw_industrial',  '50000',   'Cost per kW — Industrial (₹)',  'Installed cost per kWp for industrial systems'),
  ('peak_sun_hours',          '4',       'Peak Sun Hours (hrs/day)',       'Average daily peak sun hours for generation estimate'),
  ('degradation_rate_pct',    '0.5',     'Panel Degradation Rate (%/yr)', 'Annual power output degradation rate'),
  ('co2_per_kwh_kg',          '0.82',    'CO₂ per kWh (kg)',              'Grid emission factor in kg CO₂ per kWh'),
  ('subsidy_slab_1kw',        '30000',   'Subsidy — up to 1 kW (₹)',      'PM Surya Ghar CFA for systems up to 1 kWp'),
  ('subsidy_slab_2kw',        '60000',   'Subsidy — up to 2 kW (₹)',      'PM Surya Ghar CFA for systems up to 2 kWp'),
  ('subsidy_max',             '78000',   'Subsidy — above 2 kW max (₹)', 'Maximum PM Surya Ghar CFA for systems above 2 kWp'),
  ('state_tariffs', '{
    "Delhi": 8,
    "Maharashtra": 9,
    "Karnataka": 8.5,
    "Gujarat": 7.5,
    "Uttar Pradesh": 7,
    "Tamil Nadu": 7.5,
    "Rajasthan": 7,
    "Haryana": 7.2,
    "Madhya Pradesh": 7,
    "Punjab": 7.5,
    "Telangana": 8,
    "Kerala": 7
  }', 'State Electricity Tariffs (₹/kWh)', 'Per-unit electricity tariff used in savings calculation')
on conflict (key) do nothing;

-- ============================================================
-- SITE SETTINGS
-- ============================================================
insert into public.site_settings (key, value, category) values
  ('phone',           '"+91 98674 05251"',                           'contact'),
  ('phoneDial',       '"+919867405251"',                             'contact'),
  ('phoneRaw',        '"9867405251"',                                'contact'),
  ('email',           '"Urjaasolarenergy@gmail.com"',                'contact'),
  ('founder',         '"Abhishek Jaiswal"',                          'company'),
  ('founderFullName', '"Abhishek Jaiprakash Jaiswal"',               'company'),
  ('founderTitle',    '"Founder & Proprietor"',                      'company'),
  ('established',     '2025',                                        'company'),
  ('gstin',           '"09AYYPJ2448J1ZN"',                           'legal'),
  ('addressLine1',    '"Lucknow Allahabad Road, Near Jaishwal Guest House"', 'address'),
  ('addressLine2',    '"Kabariyaganj, Kunda"',                       'address'),
  ('district',        '"Pratapgarh"',                                'address'),
  ('state',           '"Uttar Pradesh"',                             'address'),
  ('pin',             '"230204"',                                    'address')
on conflict (key) do nothing;

-- ============================================================
-- HOMEPAGE STATS  (admin-editable trust strip)
-- ============================================================
insert into public.stats (key, value, label, suffix, sort_order) values
  ('projects',   '25',   'Projects Completed', '+', 1),
  ('capacity',   '50',   'kW Installed',        '+', 2),
  ('customers',  '20',   'Happy Customers',     '+', 3),
  ('experience', '2025', 'Established',         '',  4)
on conflict (key) do nothing;

-- ============================================================
-- SUBSIDY PROGRAMS
-- ============================================================
insert into public.subsidy_programs (
  program_name, state, description, eligibility,
  benefit_structure, max_benefit,
  effective_from, official_source_url, status, last_verified_at, verification_note
) values (
  'PM Surya Ghar Muft Bijli Yojana',
  'All India',
  'Central Financial Assistance (CFA) for rooftop solar installation on residential buildings. Eligible households receive a direct subsidy on the installed cost.',
  'Indian residential households with a valid electricity connection and rooftop with adequate shadow-free area. Registration is mandatory on the national portal.',
  '[
    {"slab": "Up to 1 kW", "benefit": "₹30,000"},
    {"slab": "1 kW to 2 kW", "benefit": "₹60,000"},
    {"slab": "2 kW to 3 kW and above", "benefit": "Up to ₹78,000 (maximum)"}
  ]',
  '₹78,000',
  '2024-02-15',
  'https://pmsuryaghar.gov.in',
  'active',
  now(),
  'Verified against MNRE guidelines. Subsidy amounts subject to change by government. Always check the official portal for latest figures.'
);

-- ============================================================
-- FAQS  (matching existing hardcoded FAQ content)
-- ============================================================
insert into public.faqs (category, question, answer, sort_order) values
  ('General', 'What does Urjaa Solar Energy do?',
   'Urjaa Solar Energy designs, installs and services rooftop solar systems for residential, commercial and industrial customers. We handle the entire journey — from site survey to net-metering approval.', 1),

  ('General', 'Where do you operate?',
   'We serve customers pan-India and travel to the site for physical survey. Please reach out via phone or WhatsApp with your location for feasibility.', 2),

  ('General', 'Are you an MNRE-approved vendor?',
   'We follow MNRE guidelines and use MNRE-approved components. For PM Surya Ghar subsidy, empanelment status is verified on a project-by-project basis with the local DISCOM.', 3),

  ('Cost & Subsidy', 'What is the cost of a rooftop solar system?',
   'Cost depends on system size, panel and inverter brand, structure type and site conditions. For residential systems, indicative pricing is generally ₹55,000 – ₹75,000 per kW before subsidy. A firm price is shared after site survey.', 4),

  ('Cost & Subsidy', 'What subsidy is available?',
   'Under PM Surya Ghar Yojana, residential customers may receive up to ₹78,000 in Central Financial Assistance. Commercial and industrial customers are generally not eligible for this specific subsidy but may claim accelerated depreciation benefits.', 5),

  ('Cost & Subsidy', 'Do you offer EMI options?',
   'Yes, several public and private banks offer solar loans for residential and commercial systems. Terms depend on the bank; we can help share current partner options during your consultation.', 6),

  ('Installation', 'How long does installation take?',
   'For a typical residential system, physical installation is 3–7 days. End-to-end (site survey to net-metering) usually takes 3–6 weeks, depending on DISCOM timelines.', 7),

  ('Installation', 'Will my roof be suitable?',
   'Most RCC, metal sheet and tile roofs are suitable. We check shadow-free area, orientation, structural fitness and access during the site survey.', 8),

  ('Installation', 'What happens at night or on cloudy days?',
   'On-grid systems draw from the grid at night. During the day, surplus generation is exported and adjusted through net-metering. Battery backup can be added for hybrid systems (extra cost).', 9),

  ('Warranty & Service', 'What warranty do I get?',
   'Solar panels carry manufacturer warranty (commonly 10-year product / 25-year performance). Inverters typically carry 5–10 year warranty. Installation workmanship is warranted by us for 1 year. Exact durations are stated on the invoice.', 10),

  ('Warranty & Service', 'Do you provide after-sales service?',
   'Yes. We provide free service visits within the first year and offer AMC contracts thereafter. Warranty claims for panels and inverters are coordinated with the respective manufacturer.', 11);

-- ============================================================
-- AFTER RUNNING THIS SEED:
--
-- 1. Create your admin user in Supabase Dashboard:
--    Authentication → Users → Add User
--    (or via: supabase.auth.admin.createUser())
--
-- 2. Grant admin role to that user:
--    UPDATE public.profiles
--    SET role = 'super_admin'
--    WHERE email = 'your-admin@email.com';
--
-- 3. Set your .env.local values (see .env.example)
-- ============================================================
