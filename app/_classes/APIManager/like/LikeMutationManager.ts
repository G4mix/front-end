import type { GenericMutationResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import { APIManager } from "@classes/APIManager/base";

export class LikeMutationManager extends APIManager {
  public static async likePost(
    id: number, isLiked: boolean,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericMutationResponse<"likePost">["data"]["likePost"] | undefined> {
    const accessToken = APIManager.getCookie("accessToken", useServer);
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };

    const query  = {
      query: "mutation likePost($postId: Int!, $isLiked: Boolean!) { likePost(postId: $postId, isLiked: $isLiked) }",
      variables: {
        postId: id,
        isLiked: isLiked
      }
    };
    const response = await APIManager.request("/graphql", JSON.stringify(query), headers, useServer);
    
    const data: GenericMutationResponse<"likePost"> = await response.json();
    return data["data"]["likePost"];
  }

  public static async likeComment(
    id: number, isLiked: boolean,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericMutationResponse<"likeComment">["data"]["likeComment"] | undefined> {
    const accessToken = APIManager.getCookie("accessToken", useServer);
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };

    const query  = {
      query: "mutation likeComment($commentId: Int!, $isLiked: Boolean!) { likeComment(commentId: $commentId, isLiked: $isLiked) }",
      variables: {
        commentId: id,
        isLiked: isLiked
      }
    };

    const response = await APIManager.request("/graphql", JSON.stringify(query), headers, useServer);
    
    const data: GenericMutationResponse<"likeComment"> = await response.json();
    return data["data"]["likeComment"];
  }
}