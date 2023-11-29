"use server";

import { cookies } from "next/headers";

export const getCookieServer = (name: "accessToken" | "refreshToken") => {
  const cookiesStore = cookies();
  const namedCookie = cookiesStore.get(name);
  return namedCookie ? namedCookie.value! : undefined;
};