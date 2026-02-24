export function isValidCatmat(value) {
  if (!value) return false;
  return /^\d{3,10}$/.test(value.trim());
}

export function isValidDateRange(minDate, maxDate) {
  if (!minDate || !maxDate) return false;
  const min = new Date(minDate);
  const max = new Date(maxDate);
  return Number.isFinite(min.getTime()) && Number.isFinite(max.getTime()) && min <= max;
}

export function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

export function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}
