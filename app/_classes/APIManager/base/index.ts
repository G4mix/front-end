import type { BackendRoutes } from "./types/BackendRoutes.types";
import { CookieManager } from "@classes/CookieManager";

export class APIManager {
  protected static async request<U extends BackendRoutes>(
    url: U,
    body: string | FormData,
    headers: HeadersInit = {},
    useServer: { useServer: boolean }
  ): Promise<Response> {
    if (!url.startsWith("/auth")) {
      headers["Authorization" as keyof typeof headers] = `Bearer ${await CookieManager.get(useServer)}`;
    }
    
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${url}`, {
      method: "POST",
      headers: headers,
      body: body,
    });

    const accessToken = response.headers.get("Authorization");
    if (accessToken && accessToken.startsWith("Bearer ")) {
      await CookieManager.set(accessToken, useServer);
    }

    return response;
  }

  protected static async handleResponse(response: Response, useServer: { useServer: boolean; } = { useServer: false }) {
    if (response.status === 401 || response.status === 403) {
      return await CookieManager.delete(useServer);
    }

    try {
      const data = await response.json();
      if (data["errors"]) {
        return { 
          error: data["errors"][0]["extensions"]["classification"] as string,
          message: data["errors"][0]["message"] as string
        };
      }
      return data;
    } catch {
      return undefined;
    }
  }
}