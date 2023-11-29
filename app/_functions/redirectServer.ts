"use server";
import { redirect } from "next/navigation";

export const redirectServer = (url: string) => {
  return redirect(url);
};