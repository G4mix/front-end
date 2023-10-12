import { getClientSideCookies } from "@functions/getClientSideCookies";

export class APIManager {
  private static async request(
    url: string,
    body: object = {},
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

    if (response.status === 401) {
      await APIManager.refreshTokens();
      return await APIManager.request(url, body, headers);
    }

    return response;
  }

  private static setCookies({ accessToken, refreshToken }: { accessToken: string; refreshToken: string; }) {
    const cookieStore = getClientSideCookies();
    cookieStore.set(accessToken);
    cookieStore.set(refreshToken);
  }

  private static async refreshTokens() {
    const cookieStore = getClientSideCookies();
    const response = await APIManager.request(
      "/auth/refreshtoken", { refreshToken: cookieStore.get("refreshToken") }
    );

    const { accessToken, refreshToken } = await response.json();

    if (accessToken && refreshToken) {
      this.setCookies({ accessToken, refreshToken });
      return response;
    }

    throw new Error("Error refreshing tokens");
  }

  public static async signUp(signUpBody: { username?: string, email?: string, password: string }) {
    const response = await APIManager.request("/auth/signup", signUpBody);
    const { accessToken, refreshToken } = await response.json();
    APIManager.setCookies({ accessToken, refreshToken });
    return response;
  }

  public static async signIn(signInBody: { username?: string, email?: string, password: string, rememberMe: boolean }) {
    const response = await APIManager.request("/auth/signin", signInBody);
    const { accessToken, refreshToken } = await response.json();
    APIManager.setCookies({ accessToken, refreshToken });
    return response;
  }

  public static signOut() {
    const cookieStore = getClientSideCookies();
    if (cookieStore.get("accessToken")) cookieStore.delete("accessToken");
    if (cookieStore.get("refreshToken")) cookieStore.delete("refreshToken");
  }

  public static async findUserByToken(): Promise<{username?: string; icon?: string; email?: string; message?: string;}> {
    const accessToken = getClientSideCookies().get("accessToken");
    
    const cachedUserDataEtag = JSON.parse(localStorage.getItem("cachedUserDataEtag")!);

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}` };
    if (cachedUserDataEtag) headers["If-None-Match"] = cachedUserDataEtag;

    const response = await APIManager.request("/graphql", {
      query: "query { findUserByToken { username email icon } }"
    }, headers);

    const data = await response.json();
    const userData =  data.data.findUserByToken;
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