"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteCookieServer() {
  const cookiesStore = cookies();
  if (cookiesStore.get("accessToken")) cookiesStore.delete("accessToken");
  redirect("/auth/signin");
}