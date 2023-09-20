import { fetchAPIBase } from "./fetchAPIBase";
import { getCookie } from "../getCookie";

export async function fetchAPIRefreshToken() {
  return await fetchAPIBase("/auth/refreshtoken", {
    body: {
      refreshToken: getCookie("refreshToken")
    }
  });
}