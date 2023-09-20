import { fetchAPIRefreshToken } from "./fetchAPIRefreshToken";
import { fetchAPIExecute } from "./fetchAPIExecute";
import { fetchAPIMount } from "./fetchAPIMount";

export const fetchAPI = {
  mount: fetchAPIMount,
  execute: fetchAPIExecute,
  refreshToken: fetchAPIRefreshToken
};