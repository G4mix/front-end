import type { HandleResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import { APIManager } from "@classes/APIManager/base";

export class LikeMutationManager extends APIManager {
  public static async likePost(
    id: number, isLiked: boolean,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<HandleResponse<"likePost">> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const query  = {
      query: "mutation likePost($postId: Int!, $isLiked: Boolean!) { likePost(postId: $postId, isLiked: $isLiked) }",
      variables: {
        postId: id,
        isLiked: isLiked
      }
    };
    
    const response = await this.request("/graphql", JSON.stringify(query), headers, useServer);
    return await this.handleResponse<"likePost">(response, "likePost", useServer);
  }

  public static async likeComment(
    id: number, isLiked: boolean,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<HandleResponse<"likeComment">> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const query  = {
      query: "mutation likeComment($commentId: Int!, $isLiked: Boolean!) { likeComment(commentId: $commentId, isLiked: $isLiked) }",
      variables: {
        commentId: id,
        isLiked: isLiked
      }
    };

    const response = await this.request("/graphql", JSON.stringify(query), headers, useServer);
    return await this.handleResponse<"likeComment">(response, "likeComment", useServer);
  }
}