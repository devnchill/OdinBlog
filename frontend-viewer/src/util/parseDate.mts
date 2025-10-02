export function parseDate(date: string | Date): string {
  const localDate = new Date(date);
  return localDate.toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
