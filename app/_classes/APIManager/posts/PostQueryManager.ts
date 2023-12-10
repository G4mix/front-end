import { GenericQueryResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import { GenericQueryRequest } from "@classes/APIManager/base/types/GraphQLRequest.types";
import { CookieManager } from "@classes/CookieManager";
import { APIManager } from "@classes/APIManager/base";

export class PostQueryManager extends APIManager {
  public static async findPostById(
    id: number, useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericQueryResponse<"findPostById">["data"]["findPostById"] | undefined> {
    const accessToken = CookieManager.get("accessToken", useServer);
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };
    const query: GenericQueryRequest<"findPostById"> = {
      query: "query findPostById($id: Int!) { findPostById(id: $id) { id author { id displayName icon user { id, username, email } } title content createdAt updatedAt isLiked likesCount commentsCount viewsCount tags { id name } links { id link } images { id name src width height } }}",
      variables: {
        id: id
      }
    };

    const response = await this.request("/graphql", JSON.stringify(query), headers, useServer);
    return await this.handleResponse<GenericQueryResponse<"findPostById">>(response, "findPostById", useServer) as GenericQueryResponse<"findPostById">["data"]["findPostById"];
  }

  public static async findAllPosts(
    skip: number,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericQueryResponse<"findAllPosts">["data"]["findAllPosts"] | undefined> {
    const accessToken = CookieManager.get("accessToken", useServer);
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };
    const query: GenericQueryRequest<"findAllPosts"> = {
      query: "query findAllPosts($skip: Int, $limit: Int) { findAllPosts(skip: $skip, limit: $limit) { id author { id displayName icon user { id, username, email } } title content createdAt updatedAt isLiked likesCount commentsCount viewsCount tags { id name } links { id link } images { id name src width height } }}",
      variables: {
        skip: skip,
        limit: 10
      }
    };
    const response = await this.request("/graphql", JSON.stringify(query), headers, useServer);
    return await this.handleResponse<GenericQueryResponse<"findAllPosts">>(response, "findAllPosts", useServer) as unknown as GenericQueryResponse<"findAllPosts">["data"]["findAllPosts"];
  }
}