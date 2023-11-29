"use server";

import { parseCookie } from "@functions/parseCookie";
import { cookies } from "next/headers";

export const setCookieServer = (cookie: string) => {
  const { name, value, opts } = parseCookie(cookie);
  const cookiesStore = cookies();
  cookiesStore.set(name, value, opts);
};