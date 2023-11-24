import type { GenericMutationResponse, GenericQueryResponse } from "./types/GraphQLResponse.types";
import type { SignInBody, SignUpBody } from "./types/RequestBody.types";
import type { GenericQueryRequest } from "./types/GraphQLRequest.types";
import type { BackendRoutes } from "./types/BackendRoutes.types";
import type { JwtTokens } from "./types/JwtTokens.types";
import { CreatePostInput } from "./types/Inputs.types";
import { CookieManager } from "@classes/CookieManager";
import { apiErrors } from "@constants/apiErrors";

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
      const { accessToken, error, message } = await APIManager.refreshTokens();
      if (apiErrors.includes(error!)) {
        return new Response(
          JSON.stringify(message), 
          { status: 401, headers: { "Content-Type": "application/json; charset=utf-8" } }
        );
      }
      const newHeaders = { ...headers, Authorization: `Bearer ${accessToken}` };
      return await APIManager.request(url, body, newHeaders);
    }

    return response;
  }

  private static setCookies({ accessToken, refreshToken }: JwtTokens): void {
    CookieManager.set(accessToken!);
    CookieManager.set(refreshToken!);
  }

  private static async refreshTokens(): Promise<{ accessToken?: string; error?: string; message?: string; }> {
    const response = await APIManager.request(
      "/auth/refreshtoken", 
      JSON.stringify({ refreshToken: CookieManager.get("refreshToken") }),
      { "Content-Type": "application/json" }
    );
  
    const { accessToken, refreshToken, error, message }: JwtTokens = await response.json();
    if (apiErrors.includes(error!)) {
      return { error, message  };
    }

    this.setCookies({ accessToken, refreshToken });
    return { accessToken: CookieManager.get("accessToken") };
    
  }

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

  public static async createPost(
    { images, ...postInput }: CreatePostInput
  ): Promise<GenericMutationResponse<"createPost">["data"]["createPost"] | undefined> {
    const accessToken = CookieManager.get("accessToken");
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}` };

    const query  = {
      query: "mutation createPost($input: PartialPostInput!, $images: [Upload]) { createPost(input: $input, images: $images) { id }}",
      variables: {
        input: postInput,
        images: !images || images.length === 0 ? undefined : new Array(images?.length).fill(null)
      }
    };

    console.log(query);

    const formData = new FormData();
    formData.append("operations", JSON.stringify(query));
    if (images && images.length > 0) {
      const map: { [key: string]: string[] } = {};
      images.map((image, index) => {
        const imageKey = `variables.images.${index}`;
        formData.append(`image${index}`, image);
        map[`image${index}`] = [imageKey];
      });
      formData.append("map", JSON.stringify(map));
    }

    for (const [key, value] of formData) {
      console.log("Chave "+key);
      console.log("Valor "+value);
    }

    const response = await APIManager.request("/graphql", formData, headers);
    
    const data: GenericMutationResponse<"createPost"> = await response.json();
    return data["data"]["createPost"];
  }

  public static async deletePost(
    id: number
  ): Promise<GenericMutationResponse<"deletePost">["data"]["deletePost"] | undefined> {
    const accessToken = CookieManager.get("accessToken");
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };

    const query  = {
      query: "mutation deletePost($postId: Int!) { deletePost(postId: $postId) }",
      variables: {
        postId: id
      }
    };

    const response = await APIManager.request("/graphql", JSON.stringify(query), headers);
    console.log(response);
    const data: GenericMutationResponse<"deletePost"> = await response.json();
    console.log(data);
    if (response.status >= 400) return;

    return data["data"]["deletePost"];
  }

  public static async findPostById(id: number): Promise<GenericQueryResponse<"findPostById">["data"]["findPostById"] | string | undefined> {
    const accessToken = CookieManager.get("accessToken");
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };
    const query: GenericQueryRequest<"findPostById"> = {
      query: "query findPostById($id: Int!) { findPostById(id: $id) { id author { id displayName user { id, username, email, icon } } title content createdAt updatedAt likesCount commentsCount viewsCount links { id link } }}",
      variables: {
        id: id
      }
    };
    const response = await APIManager.request("/graphql", JSON.stringify(query), headers);
    
    const data: GenericQueryResponse<"findPostById"> = await response.json();    
    return data["data"]["findPostById"];
  }

  public static async findAllPosts(skip: number): Promise<GenericQueryResponse<"findAllPosts">["data"]["findAllPosts"] | undefined> {
    const accessToken = CookieManager.get("accessToken");
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };
    const query: GenericQueryRequest<"findAllPosts"> = {
      query: "query findAllPosts($skip: Int, $limit: Int) { findAllPosts(skip: $skip, limit: $limit) { id author { id displayName user { id, username, email, icon } } title content createdAt updatedAt likesCount commentsCount viewsCount links { id link } images { id name src width height } }}",
      variables: {
        skip: skip,
        limit: 10
      }
    };
    const response = await APIManager.request("/graphql", JSON.stringify(query), headers);
    
    const data: GenericQueryResponse<"findAllPosts"> = await response.json();    
    return data["data"]["findAllPosts"];
  }
}