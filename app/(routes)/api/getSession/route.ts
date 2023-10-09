import { getServerSideCookies } from "@/app/_functions/getServerSideCookies";
import { APIManagerServerSide } from "@classes/APIManagerServerSide";

export async function GET() {
  const cookieManager = await getServerSideCookies();
  const accessToken = cookieManager.get("accessToken")!;
  const refreshToken = cookieManager.get("refreshToken")!;
  const response = await APIManagerServerSide.findUserByToken(accessToken, refreshToken);
  console.log(response);
  return new Response(JSON.stringify(response), { status: 200, headers: { "Content-Type": "application/json" } });
}