export const mergeArray = (array1: unknown[], array2: unknown[]) => {
  return Array.from(new Set(array1.concat(array2)));
};