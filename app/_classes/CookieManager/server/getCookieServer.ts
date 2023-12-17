"use server";

import { cookies } from "next/headers";

export async function getCookieServer() {
  return cookies().get("accessToken")?.value;
}