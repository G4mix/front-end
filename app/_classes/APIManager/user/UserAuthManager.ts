import type { SignInBody, SignUpBody } from "@classes/APIManager/base/types/RequestBody.types";
import { APIManager } from "@classes/APIManager/base";
import { apiErrors } from "@constants/apiErrors";

export class UserAuthManager extends APIManager {
  public static async signUp(signUpBody: SignUpBody): Promise<void | { error?: string; message?: string; }> {
    const response = await APIManager.request(
      "/auth/signup", JSON.stringify(signUpBody),
      { "Content-Type": "application/json" },
      { useServer: false }
    );
    const { error, message } = await response.json();
    if (apiErrors.includes(error!)) return { error, message };
  }

  public static async signIn(signInBody: SignInBody): Promise<void | { error?: string; message?: string; }> {
    const response = await APIManager.request(
      "/auth/signin", JSON.stringify(signInBody),
      { "Content-Type": "application/json" }, { useServer: false }
    );
    const { error, message } = await response.json();
    if (apiErrors.includes(error!)) return { error, message };
  }
}