import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl!.searchParams;
  const name = searchParams.get("name") as string;
  const cookiesStore = cookies();
  const namedCookie = cookiesStore.get(name);
  const cookie = namedCookie ? namedCookie.value! : null;
  console.log(name);
  const res: { [name: string]: string; } = {};
  res[name] = cookie as string;

  return Response.json(res);
}
