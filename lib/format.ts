export function formatPrice(price: number, note?: string): string {
  const formatted = new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  return note ? `${note} ${formatted}` : formatted;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
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
