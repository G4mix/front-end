import { JwtTokens } from "../APIManager/base/types/JwtTokens.types";
import { CookieManagerClient } from "./CookieManagerClient";
import { CookieManagerServer } from "./CookieManagerServer";

export class CookieManager {
  public static set(
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
  
  public static delete(
    name: "accessToken" | "refreshToken",
    { useServer }: { useServer: boolean }
  ) {
    if (!useServer) return CookieManagerClient.delete(name!);
    return CookieManagerServer.delete(name!);
  }

  public static get(
    name: "accessToken" | "refreshToken",
    { useServer }: { useServer: boolean }
  ) {
    if (!useServer) return CookieManagerClient.get(name!);
    return CookieManagerServer.get(name!);
  }

}