import { deleteCookieServer } from "./server/deleteCookieServer";
import { getCookieServer } from "./server/getCookieServer";
import { setCookieServer } from "./server/setCookieServer";

export class CookieManagerServer {
  public static get(name: "accessToken" | "refreshToken"): string | undefined {
    return getCookieServer(name);
  }

  public static delete(name: "accessToken" | "refreshToken"): void {
    return deleteCookieServer(name);
  }

  public static set(cookie: string): void {
    return setCookieServer(cookie);
  }
}