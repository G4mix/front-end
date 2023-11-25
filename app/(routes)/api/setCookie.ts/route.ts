import { parseCookie } from "@functions/parseCookie";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, value, opts } = parseCookie(body.cookie);
  const cookiesStore = cookies();
  cookiesStore.set(name, value, opts);

  return Response.json({ result: true });
}
