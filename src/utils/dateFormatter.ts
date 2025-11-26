/**
 * Formata uma data em formato relativo (ex: "Há 1 hora", "Ontem", "Há 2 dias")
 * @param date - Data a ser formatada (string ISO, Date object, ou timestamp)
 * @returns String formatada no formato relativo em português
 */
export function formatRelativeTime(date: string | Date | number): string {
  const now = new Date();
  const targetDate = new Date(date);

  // Calcula a diferença em milissegundos
  const diffInMs = now.getTime() - targetDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // Menos de 1 minuto
  if (diffInSeconds < 60) {
    return "Agora";
  }

  // Menos de 1 hora
  if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? "Há 1 minuto" : `Há ${diffInMinutes} minutos`;
  }

  // Menos de 24 horas
  if (diffInHours < 24) {
    return diffInHours === 1 ? "Há 1 hora" : `Há ${diffInHours} horas`;
  }

  // Ontem (entre 24 e 48 horas)
  if (diffInDays === 1) {
    return "Ontem";
  }

  // Menos de 7 dias
  if (diffInDays < 7) {
    return `Há ${diffInDays} dias`;
  }

  // Menos de 30 dias (aproximadamente)
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return weeks === 1 ? "Há 1 semana" : `Há ${weeks} semanas`;
  }

  // Menos de 365 dias
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return months === 1 ? "Há 1 mês" : `Há ${months} meses`;
  }

  // Mais de 1 ano
  const years = Math.floor(diffInDays / 365);
  return years === 1 ? "Há 1 ano" : `Há ${years} anos`;
}

