import { deleteCookieClient } from "./client/deleteCookieClient";
import { getCookieClient } from "./client/getCookieClient";
import { setCookieClient } from "./client/setCookieClient";

export class CookieManagerClient {
  public static get(name: "accessToken" | "refreshToken"): string | undefined {
    return getCookieClient(name);
  }

  public static delete(name: "accessToken" | "refreshToken"): void {
    deleteCookieClient(name);
  }

  public static set(cookie: string): void {
    setCookieClient(cookie);
  }
}