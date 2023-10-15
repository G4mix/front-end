import type { RequestBody, SignUpBody, SignInBody } from "./types/RequestBody.types";
import type { GenericQueryRequest } from "./types/GraphQLRequest.types";
import type { GenericQueryResponse } from "./types/GraphQLResponse.types";
import type { BackendRoutes } from "./types/BackendRoutes.types";
import type { JwtTokens } from "./types/JwtTokens.types";
import { CookieManager } from "@classes/CookieManager";

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
      if (refreshTokenData === "INVALID_REFRESH_TOKEN") return new Response(undefined, { status: 401, statusText: refreshTokenData });
      const newHeaders = { ...headers, Authorization: `Bearer ${refreshTokenData}` };
      return await APIManager.request(url, body, newHeaders);
    }

    return response;
  }

  private static setCookies({ accessToken, refreshToken }: JwtTokens): void {
    CookieManager.set(accessToken);
    CookieManager.set(refreshToken);
  }

  private static async refreshTokens() {
    const response = await APIManager.request(
      "/auth/refreshtoken", { refreshToken: CookieManager.get("refreshToken") }
    );
  
    if (response.status !== 200) return "INVALID_REFRESH_TOKEN";
  
    const { accessToken, refreshToken } = await response.json();
  
    if (accessToken && refreshToken) {
      this.setCookies({ accessToken, refreshToken });
      return CookieManager.get("accessToken");
    }
  }

  public static async signUp(signUpBody: SignUpBody): Promise<boolean> {
    const response = await APIManager.request("/auth/signup", signUpBody);
    if (response.status !== 200) return false;
    const { accessToken, refreshToken } = await response.json();
    APIManager.setCookies({ accessToken, refreshToken });
    return true;
  }

  public static async signIn(signInBody: SignInBody): Promise<boolean> {
    const response = await APIManager.request("/auth/signin", signInBody);
    if (response.status !== 200) return false;
    const { accessToken, refreshToken } = await response.json();
    APIManager.setCookies({ accessToken, refreshToken });
    return true;
  }

  public static signOut(): void {
    if (CookieManager.get("accessToken")) CookieManager.delete("accessToken");
    if (CookieManager.get("refreshToken")) CookieManager.delete("refreshToken");
  }

  public static async findUserByToken(): Promise<GenericQueryResponse<"findUserByToken">["data"]["findUserByToken"] | undefined> {
    
    const cachedUserDataEtag = JSON.parse(localStorage.getItem("cachedUserDataEtag")!);

    const headers: HeadersInit = { Authorization: `Bearer ${CookieManager.get("accessToken")}` };
    if (cachedUserDataEtag) headers["If-None-Match"] = cachedUserDataEtag;

    const query: GenericQueryRequest<"findUserByToken", {}> = { query: `query { findUserByToken { username email icon } }` };
    const response = await APIManager.request("/graphql", query, headers);

    if (response.status === 401) return;

    const data: GenericQueryResponse<"findUserByToken"> = await response.json();
    const userData =  data["data"]["findUserByToken"];
    const headerEtag = response.headers.get("ETag");

    if (userData === null && cachedUserDataEtag === headerEtag) {
      const cachedData = JSON.parse(localStorage.getItem("cachedUserData") || "{}");
      if (cachedData) return cachedData;
    }

    localStorage.setItem("cachedUserDataEtag", JSON.stringify(headerEtag));
    localStorage.setItem("cachedUserData", JSON.stringify(userData));
    return userData;
  }
}