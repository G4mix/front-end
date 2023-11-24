import type { BackendRoutes } from "./types/BackendRoutes.types";
import type { JwtTokens } from "./types/JwtTokens.types";
import { CookieManager } from "@classes/CookieManager";
import { apiErrors } from "@constants/apiErrors";

export class APIManager {
  protected static async request<U extends BackendRoutes>(
    url: U,
    body: string | FormData,
    headers: HeadersInit = {}
  ): Promise<Response> {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${url}`, {
      method: "POST",
      headers: headers,
      body: body,
    });

    if (response.status === 401 && url !== "/auth/refreshtoken") {
      const { accessToken, error, message } = await APIManager.refreshTokens();
      if (apiErrors.includes(error!)) {
        return new Response(
          JSON.stringify(message), 
          { status: 401, headers: { "Content-Type": "application/json; charset=utf-8" } }
        );
      }
      const newHeaders = { ...headers, Authorization: `Bearer ${accessToken}` };
      return await APIManager.request(url, body, newHeaders);
    }

    return response;
  }

  protected static setCookies({ accessToken, refreshToken }: JwtTokens): void {
    CookieManager.set(accessToken!);
    CookieManager.set(refreshToken!);
  }

  private static async refreshTokens(): Promise<{ accessToken?: string; error?: string; message?: string; }> {
    const response = await APIManager.request(
      "/auth/refreshtoken", 
      JSON.stringify({ refreshToken: CookieManager.get("refreshToken") }),
      { "Content-Type": "application/json" }
    );
  
    const { accessToken, refreshToken, error, message }: JwtTokens = await response.json();
    if (apiErrors.includes(error!)) {
      return { error, message  };
    }

    this.setCookies({ accessToken, refreshToken });
    return { accessToken: CookieManager.get("accessToken") };
    
  }
}