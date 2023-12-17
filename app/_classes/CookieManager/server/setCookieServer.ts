"use server";

import { cookies } from "next/headers";

export async function setCookieServer(accessToken: string) {
  const twoHoursInSeconds = 7200;
  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (twoHoursInSeconds * 1000));

  cookies().set("accessToken", accessToken, {
    maxAge: twoHoursInSeconds,
    expires: currentDate,
    path: "/",
    sameSite: "lax"
  });
}