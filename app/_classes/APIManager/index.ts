import type { GenericMutationRequest, GenericQueryRequest } from "./types/GraphQLRequest.types";
import type { SignUpBody, SignInBody } from "./types/RequestBody.types";
import type { GenericQueryResponse } from "./types/GraphQLResponse.types";
import type { BackendRoutes } from "./types/BackendRoutes.types";
import type { JwtTokens } from "./types/JwtTokens.types";
import { CookieManager } from "@classes/CookieManager";
import { apiErrors } from "@constants/apiErrors";
import { CreatePostInput } from "./types/Inputs.types";

export class APIManager {
  private static async request<U extends BackendRoutes>(
    url: U,
    body: string | FormData,
    headers: HeadersInit = {}
  ): Promise<Response> {
    const response = await fetch(`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${url}`, {
      method: "POST",
      headers: headers,
      body: body,
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
      "/auth/refreshtoken", 
      JSON.stringify({ refreshToken: CookieManager.get("refreshToken") }),
      { "Content-Type": "application/json" }
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
    const response = await APIManager.request("/auth/signup", JSON.stringify(signUpBody), { "Content-Type": "application/json" });
    const { accessToken, refreshToken, error }: JwtTokens = await response.json();
    if (apiErrors[error as keyof typeof apiErrors]) {
      return error as keyof typeof apiErrors;
    }
    APIManager.setCookies({ accessToken, refreshToken });
  }

  public static async signIn(signInBody: SignInBody): Promise<void | keyof typeof apiErrors> {
    const response = await APIManager.request("/auth/signin", JSON.stringify(signInBody), { "Content-Type": "application/json" });

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
    if (!accessToken) return;
    
    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };

    const query: GenericQueryRequest<"findUserByToken"> = { query: "query { findUserByToken { username email icon } }" };
    const response = await APIManager.request("/graphql", JSON.stringify(query), headers);
    
    const data: GenericQueryResponse<"findUserByToken"> = await response.json();
    if (apiErrors[data.error as keyof typeof apiErrors] || response.status >= 400) return;

    return data["data"]["findUserByToken"];
  }

  public static async createPost(
    { images, ...postInput }: CreatePostInput
  ): Promise<GenericQueryResponse<"createPost">["data"]["createPost"] & { error?: keyof typeof apiErrors; } | undefined> {
    const accessToken = CookieManager.get("accessToken");
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}` };

    const query  = {
      query: "mutation createPost($input: PartialPostInput!, $images: [Upload]) { createPost(input: $input, images: $images) { author { id displayName } title content }}",
      variables: {
        input: postInput,
        images: new Array(images?.length).fill(null)
      }
    };

    const formData = new FormData();
    formData.append("operations", JSON.stringify(query));
    const map: { [key: string]: string[] } = {};
    images && images.map((image, index) => {
      const imageKey = `variables.images.${index}`;
      formData.append(`image${index}`, image);
      map[`image${index}`] = [imageKey];
    });
    formData.append("map", JSON.stringify(map));

    const response = await APIManager.request("/graphql", formData, headers);
    
    const data: GenericQueryResponse<"createPost"> = await response.json();
    console.log(data);

    return;
    if (response.status >= 400) return;

    return data["data"]["createPost"];
  }

  public static async findAllPosts(skip: number): Promise<GenericQueryResponse<"findAllPosts">["data"]["findAllPosts"] | undefined> {
    const accessToken = CookieManager.get("accessToken");
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };
    const query: GenericMutationRequest<"findAllPosts"> = {
      query: "query findAllPosts($skip: Int, $limit: Int) { findAllPosts(skip: $skip, limit: $limit) { id author { id displayName user { id, username, email, icon } } title content createdAt updatedAt likesCount commentsCount viewsCount links { id link } }}",
      variables: {
        skip: skip,
        limit: 10
      }
    };
    const response = await APIManager.request("/graphql", JSON.stringify(query), headers);
    
    const data: GenericQueryResponse<"findAllPosts"> = await response.json();
    if (apiErrors[data.error as keyof typeof apiErrors] || response.status >= 400) return;
    
    return data["data"]["findAllPosts"];
  }
}