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

function subsidyFor(kw) {
  if (kw <= 1) return 30000
  if (kw <= 2) return 60000
  return 78000
}

export function calculateEstimate(input = {}) {
  const {
    monthlyBill = 3000,
    roofArea = 500,
    consumerType = 'residential',
    state = 'Delhi',
  } = input
  const rate = STATE_RATES[state] || 7.5
  const monthlyUnits = Math.max(50, Math.round(monthlyBill / rate))
  const dailyUnits = monthlyUnits / 30
  const rawKw = dailyUnits / 4
  const areaKw = roofArea / 100
  const kw = Math.round(Math.max(1, Math.min(rawKw, areaKw)) * 10) / 10
  const costPerKw = consumerType === 'residential' ? 65000 : consumerType === 'commercial' ? 55000 : 50000
  const grossCost = Math.round(kw * costPerKw)
  const subsidy = consumerType === 'residential' ? subsidyFor(kw) : 0
  const netCost = grossCost - subsidy
  const annualUnits = Math.round(kw * 4 * 365)
  const annualSavings = Math.round(annualUnits * rate)
  const monthlySavings = Math.round(annualSavings / 12)
  const payback = Math.round((netCost / annualSavings) * 10) / 10
  const twentyFiveYearSavings = Math.round(annualSavings * 25 * 1.05)
  const co2Kg = Math.round(annualUnits * 0.82)
  const roiPercent = Math.round((twentyFiveYearSavings - netCost) / netCost * 100)

  return {
    kw,
    grossCost,
    subsidy,
    netCost,
    annualUnits,
    annualSavings,
    monthlySavings,
    payback,
    twentyFiveYearSavings,
    co2Kg,
    roiPercent,
    rate,
  }
}