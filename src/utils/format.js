import { CLASS_PERIL_AVERAGE } from '../data/claims'

// Parse a currency-ish string ("£650,000") into a number, or null if invalid.
export function parseAmount(v) {
  const n = parseFloat(String(v ?? '').replace(/[£,]/g, ''))
  return Number.isNaN(n) ? null : n
}

// Format a number as GBP, e.g. 480000 -> "£480,000".
export function formatGBP(n) {
  return '£' + Math.round(n).toLocaleString('en-GB')
}

// Percentage deviation of an amount from the class/peril average.
export function deviationFromAverage(amount) {
  return ((amount - CLASS_PERIL_AVERAGE) / CLASS_PERIL_AVERAGE) * 100
}
