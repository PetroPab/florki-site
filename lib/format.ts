const MONTHS_RU = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export function formatPrice(price: number, note?: string): string {
  // Ручной форматтер — стабилен на сервере и клиенте без зависимости от ICU
  const formatted = String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
  return note ? `${note} ${formatted}` : formatted;
}

export function formatDate(dateString: string): string {
  // Разбираем строку ISO напрямую — не зависит от локали и часового пояса
  const [year, month, day] = dateString.split('-').map(Number);
  return `${day} ${MONTHS_RU[month - 1]} ${year}`;
}

export function formatReadTime(minutes: number): string {
  if (minutes === 1) return '1 минута';
  if (minutes >= 2 && minutes <= 4) return `${minutes} минуты`;
  return `${minutes} минут`;
}

export function formatDimensions(dims: {
  width?: number;
  height?: number;
  depth?: number;
  diameter?: number;
}): string {
  const parts: string[] = [];
  if (dims.diameter) parts.push(`Ø ${dims.diameter} см`);
  if (dims.width && dims.height && dims.depth)
    parts.push(`${dims.width}×${dims.height}×${dims.depth} см`);
  else if (dims.width && dims.height)
    parts.push(`${dims.width}×${dims.height} см`);
  if (dims.height && !dims.width) parts.push(`выс. ${dims.height} см`);
  return parts.join(', ');
}
