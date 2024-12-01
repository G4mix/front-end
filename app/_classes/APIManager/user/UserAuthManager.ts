import type { RequestBody } from "@classes/APIManager/base/types/request";
import type { ApiResponse } from "@classes/APIManager/base/types/response";
import { APIManager } from "@classes/APIManager/base";

export class UserAuthManager extends APIManager {
  public static async signIn(signInBody: RequestBody<"auth-signin:post">): Promise<ApiResponse<"auth-signin:post"> | void> {
    return await APIManager.request<"auth-signin:post">({
      url: "/auth/signin",
      body: JSON.stringify(signInBody),
      headers: { "Content-Type": "application/json" }
    });
  }
}