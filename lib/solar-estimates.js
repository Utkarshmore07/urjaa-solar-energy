const STATE_RATES = {
  Delhi: 8,
  Maharashtra: 9,
  Karnataka: 8.5,
  Gujarat: 7.5,
  'Uttar Pradesh': 7,
  'Tamil Nadu': 7.5,
  Rajasthan: 7,
  Haryana: 7.2,
  'Madhya Pradesh': 7,
  Punjab: 7.5,
  Telangana: 8,
  Kerala: 7,
}

export const SOLAR_ESTIMATE_STATES = Object.keys(STATE_RATES)

export const DEFAULT_SOLAR_ESTIMATE_CONFIG = {
  cost_per_kw_residential: 65000,
  cost_per_kw_commercial: 55000,
  cost_per_kw_industrial: 50000,
  peak_sun_hours: 4,
  system_efficiency_pct: 80,
  panel_wattage: 550,
  roof_area_per_panel_sqft: 20,
  degradation_rate_pct: 0.5,
  co2_per_kwh_kg: 0.82,
  subsidy_slab_1kw: 30000,
  subsidy_slab_2kw: 60000,
  subsidy_max: 78000,
  state_tariffs: STATE_RATES,
}

function subsidyFor(kw, config) {
  if (kw <= 1) return config.subsidy_slab_1kw
  if (kw <= 2) return config.subsidy_slab_2kw
  return config.subsidy_max
}

export function calculateEstimate(input = {}, overrides = {}) {
  const config = { ...DEFAULT_SOLAR_ESTIMATE_CONFIG, ...overrides }
  const tariffs = { ...STATE_RATES, ...(config.state_tariffs || {}) }
  const {
    monthlyBill = 3000,
    roofArea = 500,
    consumerType = 'residential',
    state = 'Delhi',
  } = input
  const rate = Math.max(0, Number(input.tariff) || tariffs[state] || 7.5)
  const efficiency = Math.max(0.1, (Number(config.system_efficiency_pct) || 80) / 100)
  const generationPerKwMonth = (Number(config.peak_sun_hours) || 4) * 30 * efficiency
  const monthlyUnits = rate ? Math.max(0, Number(monthlyBill) / rate) : 0
  const billKw = monthlyUnits / Math.max(1, generationPerKwMonth)
  const areaKw = Number(roofArea) / Math.max(1, (Number(config.roof_area_per_panel_sqft) || 20) * 100)
  const requestedKw = Number(input.systemCapacity) || 0
  const kw = Math.round(Math.max(0.5, Math.min(requestedKw || billKw, areaKw || billKw)) * 10) / 10
  const panels = Math.max(1, Math.ceil(kw * 1000 / (Number(config.panel_wattage) || 550)))
  const requiredRoofArea = Math.ceil(panels * (Number(config.roof_area_per_panel_sqft) || 20))
  const monthlyGeneration = Math.round(kw * generationPerKwMonth)
  const monthlySavings = Math.min(Number(monthlyBill), Math.round(monthlyGeneration * rate))
  const annualUnits = monthlyGeneration * 12
  const annualSavings = monthlySavings * 12
  const costPerKw = Number(config[`cost_per_kw_${consumerType}`]) || 65000
  const grossCost = Math.round(kw * costPerKw)
  const subsidy = consumerType === 'residential' ? Math.min(grossCost, subsidyFor(kw, config)) : 0
  const netCost = grossCost - subsidy
  const payback = annualSavings > 0 ? Math.round((netCost / annualSavings) * 10) / 10 : null
  const degradation = (Number(config.degradation_rate_pct) || 0.5) / 100
  const twentyFiveYearSavings = Math.round(Array.from({ length: 25 }, (_, year) => annualSavings * Math.pow(1 - degradation, year)).reduce((sum, value) => sum + value, 0))
  const co2Kg = Math.round(annualUnits * (Number(config.co2_per_kwh_kg) || 0.82))

  return {
    kw,
    panels,
    requiredRoofArea,
    monthlyGeneration,
    grossCost,
    subsidy,
    netCost,
    annualUnits,
    annualSavings,
    monthlySavings,
    payback,
    twentyFiveYearSavings,
    co2Kg,
    rate,
    assumptions: { peakSunHours: Number(config.peak_sun_hours) || 4, systemEfficiency: efficiency, panelWattage: Number(config.panel_wattage) || 550 },
  }
}
