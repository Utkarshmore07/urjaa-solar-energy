const STANDARD_INVERTERS = [1, 2, 3, 5, 7.5, 10, 15, 20]

const safeNumber = (value, fallback = 0) => {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

export function calculateConnectedLoad(appliances) {
  return appliances.reduce((sum, appliance) => sum + safeNumber(appliance.watts) * safeNumber(appliance.quantity, 1), 0)
}

export function calculateDailyConsumption(appliances) {
  return appliances.reduce((sum, appliance) => sum + (safeNumber(appliance.watts) * safeNumber(appliance.quantity, 1) * safeNumber(appliance.hours)) / 1000, 0)
}

export function calculateNightConsumption(appliances) {
  return appliances.reduce((sum, appliance) => sum + (safeNumber(appliance.watts) * safeNumber(appliance.quantity, 1) * Math.min(24, Math.max(0, safeNumber(appliance.nightHours)))) / 1000, 0)
}

export function calculateMonthlyConsumption(dailyKwh) {
  return safeNumber(dailyKwh) * 30
}

export function calculateEstimatedBill(monthlyKwh, tariff) {
  return safeNumber(monthlyKwh) * Math.max(0, safeNumber(tariff))
}

export function calculateInverterSize(connectedWatts) {
  const requiredWatts = Math.max(0, safeNumber(connectedWatts)) * 1.25
  return STANDARD_INVERTERS.find(value => value * 1000 >= requiredWatts) || Math.max(1, Math.ceil(requiredWatts / 1000))
}

export function calculateSolarCapacity(dailyKwh, peakSunHours = 5, systemEfficiency = 0.8) {
  const capacity = safeNumber(dailyKwh) / Math.max(1, peakSunHours) / Math.max(0.1, systemEfficiency)
  return Math.max(1, Math.ceil(capacity * 10) / 10)
}

export function calculateBatteryCapacity(connectedWatts, backupHours, usableCapacity = 0.9) {
  const capacity = (safeNumber(connectedWatts) / 1000 * Math.max(0, safeNumber(backupHours))) / Math.max(0.1, usableCapacity)
  return Math.max(0, Math.ceil(capacity * 10) / 10)
}

export function calculateSolarRecommendation(appliances, tariff, backupHours) {
  const connectedWatts = calculateConnectedLoad(appliances)
  const dailyKwh = calculateDailyConsumption(appliances)
  const nightKwh = calculateNightConsumption(appliances)
  const monthlyKwh = calculateMonthlyConsumption(dailyKwh)
  return {
    connectedKw: connectedWatts / 1000,
    dailyKwh,
    nightKwh,
    monthlyKwh,
    estimatedBill: calculateEstimatedBill(monthlyKwh, tariff),
    recommendedInverter: calculateInverterSize(connectedWatts),
    solarKw: calculateSolarCapacity(dailyKwh),
    batteryKwh: calculateBatteryCapacity(connectedWatts, backupHours),
  }
}