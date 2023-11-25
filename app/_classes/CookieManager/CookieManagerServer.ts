import { deleteCookieServer } from "./server/deleteCookieServer";
import { getCookieServer } from "./server/getCookieServer";
import { setCookieServer } from "./server/setCookieServer";

export class CookieManagerServer {
  public static async get(name: "accessToken" | "refreshToken"): Promise<string | undefined> {
    return await getCookieServer(name);
  }

  public static async delete(name: "accessToken" | "refreshToken"): Promise<void> {
    await deleteCookieServer(name);
  }

  public static async set(cookie: string): Promise<void> {
    await setCookieServer(cookie);
  }
}