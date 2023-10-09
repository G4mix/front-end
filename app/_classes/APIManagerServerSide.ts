type RequestOptions = {
  url: string;
  method?: string;
  refreshToken?: string;
}
export class APIManagerServerSide {
  private static async request(
    { url, method="POST", refreshToken="" }: RequestOptions,
    body: object = {},
    headers: HeadersInit = {}
  ): Promise<any> {
    console.log(headers);
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${url}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      await APIManagerServerSide.refreshTokens(refreshToken);
      return await APIManagerServerSide.request({ url, method, refreshToken }, body, headers );
    }

    return response.json();
  }

  private static async refreshTokens(refreshToken: string) {

    const response = await APIManagerServerSide.request(
      { url: "/auth/refreshtoken", refreshToken }, { refreshToken }
    );

    if (response.accessToken && response.refreshToken) {
      return response;
    }

    throw new Error("Error refreshing tokens");
  }

  public static async signUp(signUpBody: { username?: string, email?: string, password: string }) {
    const response = await APIManagerServerSide.request({ url: "/auth/signup" }, signUpBody);

    return response;
  }

  public static async signIn(signInBody: { username?: string, email?: string, password: string, rememberMe: boolean }) {
    const response = await APIManagerServerSide.request({ url: "/auth/signin" }, signInBody);

    return response;
  }

  public static async signOut() {
    const response = await APIManagerServerSide.request({ url: "/auth/signout" });

    return response;
  }

  public static async findUserByToken(accessToken: string, refreshToken: string) {
    return await APIManagerServerSide.request({ url: "/graphql", refreshToken  }, {
      query: "query { findUserByToken { username email icon } }",
      next: { revalidate: 3600 }
    }, { Authorization: `Bearer ${accessToken}` });
  }
}