import { GenericQueryResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import { GenericQueryRequest } from "@classes/APIManager/base/types/GraphQLRequest.types";
import { APIManager } from "@classes/APIManager/base";

export class PostQueryManager extends APIManager {
  public static async findPostById(
    id: number, useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericQueryResponse<"findPostById">["data"]["findPostById"] | string | undefined> {
    const accessToken = await APIManager.getCookie("accessToken", useServer);
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };
    const query: GenericQueryRequest<"findPostById"> = {
      query: "query findPostById($id: Int!) { findPostById(id: $id) { id author { id displayName user { id, username, email, icon } } title content createdAt updatedAt likesCount commentsCount viewsCount links { id link } }}",
      variables: {
        id: id
      }
    };
    const response = await APIManager.request("/graphql", JSON.stringify(query), headers, useServer);
    
    const data: GenericQueryResponse<"findPostById"> = await response.json();    
    return data["data"]["findPostById"];
  }

  public static async findAllPosts(
    skip: number,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericQueryResponse<"findAllPosts">["data"]["findAllPosts"] | undefined> {
    const accessToken = await APIManager.getCookie("accessToken", useServer);
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };
    const query: GenericQueryRequest<"findAllPosts"> = {
      query: "query findAllPosts($skip: Int, $limit: Int) { findAllPosts(skip: $skip, limit: $limit) { id author { id displayName user { id, username, email, icon } } title content createdAt updatedAt likesCount commentsCount viewsCount links { id link } images { id name src width height } }}",
      variables: {
        skip: skip,
        limit: 10
      }
    };
    const response = await APIManager.request("/graphql", JSON.stringify(query), headers, useServer);
    
    const data: GenericQueryResponse<"findAllPosts"> = await response.json();
    return data["data"]["findAllPosts"];
  }
}