export function formatNumberWithSuffix(number: number) {
  const absNumber = Math.abs(number);

  const suffixes = ["", "K", "M", "B", "T", "Qd", "Qn", "S"];
  const order = Math.floor(Math.log10(absNumber) / 3);

  const suffix = suffixes[order];
  const scaledNumber = number / Math.pow(10, order * 3);

  const formattedNumber = scaledNumber.toFixed(1);

  return formattedNumber + suffix;
}