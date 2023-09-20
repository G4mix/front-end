import { fetchAPIBase } from "./fetchAPIBase";

export function fetchAPIMount(...args: Parameters<typeof fetchAPIBase>) {
  return async () => fetchAPIBase(...args);
}