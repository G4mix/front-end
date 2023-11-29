export function formatDate(date: Date): string {
  const abbreviatedMonths = [
    "jan", "fev", "mar", "abr", "mai", "jun",
    "jul", "ago", "set", "out", "nov", "dez"
  ];

  const day = date.getDate();
  const month = abbreviatedMonths[date.getMonth()];
  const year = date.getFullYear() % 100;

  return `${day} ${month}. ${year}`;
}