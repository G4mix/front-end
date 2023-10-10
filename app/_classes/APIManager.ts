import { getClientSideCookies } from "@functions/getClientSideCookies";

export class APIManager {
  private static async request(
    url: string,
    body: object = {},
    headers: HeadersInit = {}
  ): Promise<any> {
    const response = await fetch(`/api/backend?url=${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      await APIManager.refreshTokens();
      return await APIManager.request(url, body, headers);
    }

    return await response.json();
  }

  private static async refreshTokens() {
    const cookieStore = getClientSideCookies();
    const response = await APIManager.request(
      "/auth/refreshtoken", { refreshToken: cookieStore.get("refreshToken") }
    );

    if (response.accessToken && response.refreshToken) {
      cookieStore.set(response.accessToken);
      cookieStore.set(response.refreshToken);
      return response;
    }

    throw new Error("Error refreshing tokens");
  }

  private static setCookies({ accessToken, refreshToken }: { accessToken: string; refreshToken: string; }) {
    const cookieStore = getClientSideCookies();
    cookieStore.set(accessToken);
    cookieStore.set(refreshToken);
  }

  public static async signUp(signUpBody: { username?: string, email?: string, password: string }) {
    const response = await APIManager.request("/auth/signup", signUpBody);
    APIManager.setCookies(response);
    return response;
  }

  public static async signIn(signInBody: { username?: string, email?: string, password: string, rememberMe: boolean }) {
    const response = await APIManager.request("/auth/signin", signInBody);
    APIManager.setCookies(response);
    return response;
  }

  public static signOut() {
    const cookieStore = getClientSideCookies();
    if (cookieStore.get("accessToken")) cookieStore.delete("accessToken");
    if (cookieStore.get("refreshToken")) cookieStore.delete("refreshToken");
  }

  public static async findUserByToken(): Promise<{username?: string; icon?: string; email?: string; message?: string;}> {
    const accessToken = getClientSideCookies().get("accessToken");
    
    const response = await APIManager.request("/graphql", {
      query: "query { findUserByToken { username email icon } }"
    }, { Authorization: `Bearer ${accessToken}` });

    return response.data.findUserByToken;
  }
}