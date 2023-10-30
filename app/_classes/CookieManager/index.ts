export class CookieManager {
  public static get(name: "accessToken" | "refreshToken"): string | undefined {
    const allCookies = document.cookie.split(";").map((cookie) => cookie.trim());
    const targetCookie = allCookies.find((cookie) => cookie.startsWith(name + "="));

    return targetCookie ? targetCookie.substring(name.length + 1) : undefined;
  }

  public static delete(name: "accessToken" | "refreshToken"): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  public static set(cookie: string): void {
    document.cookie = cookie;
  }
}