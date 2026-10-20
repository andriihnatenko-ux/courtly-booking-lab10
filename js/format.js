/* Courtly Booking — formatting helpers */

/** 1200 → "1 200 грн" */
export function formatPrice(value) {
  return `${value.toLocaleString('uk-UA')} грн`;
}

/** "2026-10-09" → "пт, 9 жовтня" */
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('uk-UA', { weekday: 'short', day: 'numeric', month: 'long' });
}

/** Date → "2026-10-09", in local time (the value format of <input type="date">) */
export function toISODate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}
