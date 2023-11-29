import type { SignInBody, SignUpBody } from "@classes/APIManager/base/types/RequestBody.types";
import { CookieManager } from "@classes/CookieManager";
import { APIManager } from "@classes/APIManager/base";
import { apiErrors } from "@constants/apiErrors";
import { JwtTokens } from "@classes/APIManager/base/types/JwtTokens.types";

export class UserAuthManager extends APIManager {
  public static async signUp(signUpBody: SignUpBody): Promise<void | { error?: string; message?: string; }> {
    const response = await APIManager.request(
      "/auth/signup", JSON.stringify(signUpBody),
      { "Content-Type": "application/json" },
      { useServer: false }
    );
    const { accessToken, refreshToken, error, message }: JwtTokens = await response.json();
    if (apiErrors.includes(error!)) return { error, message };
    CookieManager.set({ accessToken, refreshToken }, { useServer: false });
  }

  public static async signIn(signInBody: SignInBody): Promise<void | { error?: string; message?: string; }> {
    const response = await APIManager.request(
      "/auth/signin", JSON.stringify(signInBody),
      { "Content-Type": "application/json" }, { useServer: false }
    );
    const { accessToken, refreshToken, error, message } = await response.json();
    if (apiErrors.includes(error!)) return { error, message };
    CookieManager.set({ accessToken, refreshToken }, { useServer: false });
  }

}