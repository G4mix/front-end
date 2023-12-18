import { GenericQueryRequest } from "@classes/APIManager/base/types/GraphQLRequest.types";
import { APIManager } from "@classes/APIManager/base";
import { HandleResponse } from "../base/types/GraphQLResponse.types";

export class PostQueryManager extends APIManager {
  public static async findPostById(
    id: number, useServer: { useServer: boolean } = { useServer: false }
  ): Promise<HandleResponse<"findPostById">> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const query: GenericQueryRequest<"findPostById"> = {
      query: "query findPostById($id: Int!) { findPostById(id: $id) { id author { id displayName icon user { id, username, email } } title content createdAt updatedAt isLiked likesCount commentsCount viewsCount tags { id name } links { id link } images { id name src width height } }}",
      variables: {
        id: id
      }
    };

    const response = await this.request("/graphql", JSON.stringify(query), headers, useServer);
    return await this.handleResponse<"findPostById">(response, "findPostById", useServer);
  }

  public static async findAllPosts(
    skip: number,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<HandleResponse<"findAllPosts">> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const query: GenericQueryRequest<"findAllPosts"> = {
      query: "query findAllPosts($skip: Int, $limit: Int) { findAllPosts(skip: $skip, limit: $limit) { id author { id displayName icon user { id, username } } title content createdAt updatedAt isLiked likesCount commentsCount viewsCount links { id link } images { id name src width height } }}",
      variables: {
        skip: skip,
        limit: 10
      }
    };
    
    const response = await this.request("/graphql", JSON.stringify(query), headers, useServer);
    return await this.handleResponse<"findAllPosts">(response, "findAllPosts", useServer);
  }
}