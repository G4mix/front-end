export const debounce = (func: (id: number, isLiked: boolean) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (id: number, isLiked: boolean) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(id, isLiked);
    }, delay);
  };
};