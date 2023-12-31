import type { GenericMutationResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import { CookieManager } from "@classes/CookieManager";
import { APIManager } from "@classes/APIManager/base";

export class CommentMutationManager extends APIManager {
  public static async commentPost(
    id: number, content: string,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericMutationResponse<"commentPost">["data"]["commentPost"] | undefined> {
    const accessToken = CookieManager.get("accessToken", useServer);
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };
    let dataToGet = "id content likesCount createdAt updatedAt isLiked author { id displayName user { username email icon } }";
    dataToGet = `${dataToGet} parentComment { ${dataToGet} }`;

    const query  = {
      query: `mutation commentPost($postId: Int!, $content: String!) { commentPost(postId: $postId, content: $content) { ${dataToGet} } }`,
      variables: {
        postId: id,
        content: content
      }
    };
    
    const response = await this.request("/graphql", JSON.stringify(query), headers, useServer);
    return await this.handleResponse<GenericMutationResponse<"commentPost">>(response, "commentPost", useServer) as GenericMutationResponse<"commentPost">["data"]["commentPost"];
  }

  public static async replyComment(
    id: number, content: string,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericMutationResponse<"replyComment">["data"]["replyComment"] | undefined> {
    const accessToken = CookieManager.get("accessToken", useServer);
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };
    let dataToGet = "id content likesCount createdAt updatedAt isLiked author { id displayName user { username email icon } }";
    dataToGet = `${dataToGet} parentComment { ${dataToGet} }`;
    
    const query  = {
      query: `mutation replyComment($commentId: Int!, $content: String!) { replyComment(commentId: $commentId, content: $content) { ${dataToGet} } }`,
      variables: {
        commentId: id,
        content: content
      }
    };

    const response = await this.request("/graphql", JSON.stringify(query), headers, useServer);
    return await this.handleResponse<GenericMutationResponse<"replyComment">>(response, "replyComment", useServer) as GenericMutationResponse<"replyComment">["data"]["replyComment"];
  }
}