import type { BackendRoutes } from "./types/BackendRoutes.types";
import type { JwtTokens } from "./types/JwtTokens.types";
import { CookieManager } from "@classes/CookieManager";

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
      const res = await APIManager.refreshTokens(useServer);
      if (res instanceof Response && !res.ok) return res;
      
      const { accessToken } = res as { accessToken: string };
      const newHeaders = { ...headers, Authorization: `Bearer ${accessToken! as string}` };
      return await APIManager.request(url, body, newHeaders, useServer);
    }

    return response;
  }

  protected static async handleResponse<T>(response: Response, field: string, useServer: { useServer: boolean }): Promise<void | T | { error: string; message: string; }> {
    if (response.status === 401) {
      this.signOut(useServer);
      if (window) window.location.href = "/auth/signin";
      return;
    }
    const data = await response.json();
    if (data["errors"]) return { error: data["errors"][0]["extensions"]["classification"] as string, message: data["errors"][0]["message"] as string};
    return data["data"][field];
  }


  private static async refreshTokens(
    useServer: { useServer: boolean }
  ): Promise<{ accessToken?: string; } | Response> {
    const cookieRefreshToken = CookieManager.get("refreshToken", useServer);
    
    const response = await APIManager.request(
      "/auth/refreshtoken", 
      JSON.stringify({ refreshToken: cookieRefreshToken }),
      { "Content-Type": "application/json" },
      useServer
    );
  
    const { accessToken, refreshToken, error }: JwtTokens = await response.json();
    if (error!) return response;
    
    CookieManager.set({ accessToken, refreshToken }, useServer);
    return { accessToken };
  }

  public static async signOut({ useServer }: { useServer: boolean } = { useServer: false }): Promise<void> {
    const accessToken = CookieManager.get("accessToken", { useServer });
    const refreshToken = CookieManager.get("refreshToken", { useServer });
    if (accessToken) CookieManager.delete("accessToken", { useServer });
    if (refreshToken) CookieManager.delete("refreshToken", { useServer });
  }
}