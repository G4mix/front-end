"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteCookieServer() {
  const cookiesStore = cookies();
  if (cookiesStore.get("token")) cookiesStore.delete("token");
  redirect("/auth/signin");
}