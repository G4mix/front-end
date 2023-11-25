import { getCookieClient } from "./client/getCookieClient";
import { getCookieServer } from "./server/getCookieServer";

export class CookieManager {
  public static get(name: "accessToken" | "refreshToken", { useServer }: { useServer?: boolean; } = { useServer: false }): string | undefined {
    if (useServer) {
      return getCookieServer(name);
    }
    return getCookieClient(name);
  }

  public static delete(name: "accessToken" | "refreshToken"): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  public static set(cookie: string): void {
    document.cookie = cookie;
  }
}