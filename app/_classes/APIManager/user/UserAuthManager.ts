import { SignInBody, SignUpBody } from "@classes/APIManager/base/types/RequestBody.types";
import { GenericQueryResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import { GenericQueryRequest } from "@classes/APIManager/base/types/GraphQLRequest.types";
import { CookieManager } from "@classes/CookieManager";
import { APIManager } from "@classes/APIManager/base";
import { apiErrors } from "@constants/apiErrors";
import { JwtTokens } from "@classes/APIManager/base/types/JwtTokens.types";

export class UserAuthManager extends APIManager {
  public static async signUp(signUpBody: SignUpBody): Promise<void | string> {
    const response = await APIManager.request("/auth/signup", JSON.stringify(signUpBody), { "Content-Type": "application/json" });
    const { accessToken, refreshToken, error, message }: JwtTokens = await response.json();
    if (apiErrors.includes(error!)) {
      return message!;
    }
    APIManager.setCookies({ accessToken, refreshToken });
  }

  public static async signIn(signInBody: SignInBody): Promise<void | string> {
    const response = await APIManager.request("/auth/signin", JSON.stringify(signInBody), { "Content-Type": "application/json" });
    const { accessToken, refreshToken, error, message } = await response.json();
    if (apiErrors.includes(error!)) {
      return message!;
    }
    APIManager.setCookies({ accessToken, refreshToken });
  }

  public static signOut(): void {
    if (CookieManager.get("accessToken")) CookieManager.delete("accessToken");
    if (CookieManager.get("refreshToken")) CookieManager.delete("refreshToken");
  }

  public static async findUserByToken(): Promise<GenericQueryResponse<"findUserByToken">["data"]["findUserByToken"] | undefined> {
    const accessToken = CookieManager.get("accessToken");
    if (!accessToken) return;
    
    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };

    const query: GenericQueryRequest<"findUserByToken"> = { query: "query { findUserByToken { username email icon } }" };
    const response = await APIManager.request("/graphql", JSON.stringify(query), headers);
    
    const data: GenericQueryResponse<"findUserByToken"> = await response.json();
    return data["data"]["findUserByToken"];
  }

}