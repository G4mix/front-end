import type { BackendRoutes } from "./types/BackendRoutes.types";
import type { JwtTokens } from "./types/JwtTokens.types";
import { CookieManagerClient } from "@classes/CookieManager/CookieManagerClient";
import { CookieManagerServer } from "@classes/CookieManager/CookieManagerServer";
import { apiErrors } from "@constants/apiErrors";

export class APIManager {
  protected static async request<U extends BackendRoutes>(
    url: U,
    body: string | FormData,
    headers: HeadersInit = {},
    useServer: { useServer: boolean }
  ): Promise<Response> {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${url}`, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (response.status === 401 && url !== "/auth/refreshtoken") {
      const { accessToken, error, message } = await APIManager.refreshTokens(useServer);
      if (apiErrors.includes(error!)) {
        return new Response(
          JSON.stringify(message), 
          { status: 401, headers: { "Content-Type": "application/json; charset=utf-8" } }
        );
      }
      const newHeaders = { ...headers, Authorization: `Bearer ${accessToken}` };
      return await APIManager.request(url, body, newHeaders, useServer);
    }

    return response;
  }

  protected static deleteCookie(
    name: "accessToken" | "refreshToken",
    { useServer }: { useServer: boolean }
  ) {
    if (!useServer) return CookieManagerClient.delete(name!);
    CookieManagerServer.delete(name!);
  }

  public static getCookie(
    name: "accessToken" | "refreshToken",
    { useServer }: { useServer: boolean }
  ) {
    if (!useServer) return CookieManagerClient.get(name!);
    return CookieManagerServer.get(name!);
  }

  protected static setCookies(
    { accessToken, refreshToken }: JwtTokens,
    { useServer }: { useServer: boolean }
  ) {
    if (!useServer) {
      CookieManagerClient.set(accessToken!);
      CookieManagerClient.set(refreshToken!);
      return;
    }
    CookieManagerServer.set(accessToken!);
    CookieManagerServer.set(refreshToken!);
  }

  private static async refreshTokens(
    useServer: { useServer: boolean }
  ): Promise<{ accessToken?: string; error?: string; message?: string; }> {
    const cookieRefreshToken = APIManager.getCookie("refreshToken", useServer);
    
    const response = await APIManager.request(
      "/auth/refreshtoken", 
      JSON.stringify({ refreshToken: cookieRefreshToken }),
      { "Content-Type": "application/json" },
      useServer
    );
  
    const { accessToken, refreshToken, error, message }: JwtTokens = await response.json();
    if (apiErrors.includes(error!)) {
      return { error, message  };
    }

    await APIManager.setCookies({ accessToken, refreshToken }, useServer);
    return { accessToken };
  }
}