import type { RequestBody, SignUpBody, SignInBody } from "./types/RequestBody.types";
import type { GenericQueryRequest } from "./types/GraphQLRequest.types";
import type { GenericQueryResponse } from "./types/GraphQLResponse.types";
import type { BackendRoutes } from "./types/BackendRoutes.types";
import type { JwtTokens } from "./types/JwtTokens.types";
import { CookieManager } from "@classes/CookieManager";
import { apiErrors } from "@constants/apiErrors";

export class APIManager {
  private static async request<U extends BackendRoutes>(
    url: U,
    body: RequestBody<U>,
    headers: HeadersInit = {}
  ): Promise<Response> {
    const response = await fetch(`/api/backend?url=${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: JSON.stringify(body),
    });

    if (response.status === 401 && url !== "/auth/refreshtoken") {
      const refreshTokenData = await APIManager.refreshTokens();
      if (apiErrors[refreshTokenData as keyof typeof apiErrors]) {
        return new Response(
          JSON.stringify(refreshTokenData), 
          { status: 401, statusText: apiErrors[refreshTokenData as keyof typeof apiErrors] }
        );
      }
      const newHeaders = { ...headers, Authorization: `Bearer ${refreshTokenData}` };
      return await APIManager.request(url, body, newHeaders);
    }

    return response;
  }

  private static setCookies({ accessToken, refreshToken }: JwtTokens): void {
    CookieManager.set(accessToken);
    CookieManager.set(refreshToken);
  }

  private static async refreshTokens(): Promise<string | undefined> {
    const response = await APIManager.request(
      "/auth/refreshtoken", { refreshToken: CookieManager.get("refreshToken") }
    );
  
    const { accessToken, refreshToken, error }: JwtTokens = await response.json();

    if (apiErrors[error as keyof typeof apiErrors]) {
      return error as keyof typeof apiErrors;
    }
  
    if (accessToken && refreshToken) {
      this.setCookies({ accessToken, refreshToken });
      return CookieManager.get("accessToken");
    }
  }

  public static async signUp(signUpBody: SignUpBody): Promise<void | keyof typeof apiErrors> {
    const response = await APIManager.request("/auth/signup", signUpBody);
    const { accessToken, refreshToken, error }: JwtTokens = await response.json();
    if (apiErrors[error as keyof typeof apiErrors]) {
      return error as keyof typeof apiErrors;
    }
    APIManager.setCookies({ accessToken, refreshToken });
  }

  public static async signIn(signInBody: SignInBody): Promise<void | keyof typeof apiErrors> {
    const response = await APIManager.request("/auth/signin", signInBody);

    const { accessToken, refreshToken, error } = await response.json();
    if (apiErrors[error as keyof typeof apiErrors]) {
      return error as keyof typeof apiErrors;
    }
    APIManager.setCookies({ accessToken, refreshToken });
  }

  public static signOut(): void {
    if (CookieManager.get("accessToken")) CookieManager.delete("accessToken");
    if (CookieManager.get("refreshToken")) CookieManager.delete("refreshToken");
  }

  public static async findUserByToken(): Promise<GenericQueryResponse<"findUserByToken">["data"]["findUserByToken"] | undefined> {
    const accessToken = CookieManager.get("accessToken");

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}` };

    const query: GenericQueryRequest<"findUserByToken", {}> = { query: `query { findUserByToken { username email icon } }` };
    const response = await APIManager.request("/graphql", query, headers);
    
    const data: GenericQueryResponse<"findUserByToken"> = await response.json();
    if (apiErrors[data.error as keyof typeof apiErrors] || response.status >= 400) return;
    
    const userData = data["data"]["findUserByToken"];

    return userData;
  }
}