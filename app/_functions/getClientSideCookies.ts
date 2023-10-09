import type { CookieStore } from "./CookieStore";

export function getClientSideCookies(): CookieStore {
  "use client";
  return {
    get: (name) => {
      const allCookies = document.cookie.split(";").map((cookie) => cookie.trim());
      const targetCookie = allCookies.find((cookie) => cookie.startsWith(name + "="));

      return targetCookie ? targetCookie.substring(name.length + 1) : undefined;
    },
    delete: (name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    },
    set: (cookie) => {
      document.cookie = cookie;
    },
  }
}