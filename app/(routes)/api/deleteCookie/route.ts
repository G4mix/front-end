import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl!.searchParams;
  const name = searchParams.get("name") as string;
  const cookiesStore = cookies();
  cookiesStore.delete(name);

  return Response.json({ result: true });
}
