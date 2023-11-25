"use server";

import { cookies } from "next/headers";

export const deleteCookieServer = (name: "accessToken" | "refreshToken") => {
  const cookiesStore = cookies();
  cookiesStore.delete(name);
};