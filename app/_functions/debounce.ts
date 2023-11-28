export const debounce = <F extends (...args: unknown[]) => unknown>(
  func: F,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
