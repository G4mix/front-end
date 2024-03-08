import type { HandleResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import { APIManager } from "@classes/APIManager/base";

export class CommentMutationManager extends APIManager {
  public static async commentPost(
    id: number, content: string,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<HandleResponse<"commentPost">> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    let dataToGet = "id content likesCount createdAt updatedAt isLiked author { id displayName icon user { username email } }";
    dataToGet = `${dataToGet} parentComment { ${dataToGet} }`;

    const query  = {
      query: `mutation commentPost($postId: Int!, $content: String!) { commentPost(postId: $postId, content: $content) { ${dataToGet} } }`,
      variables: {
        postId: id,
        content: content
      }
    };
    
    const response = await this.request("/graphql", JSON.stringify(query), headers, useServer);
    return await this.handleResponse<"commentPost">(response, "commentPost", useServer);
  }

  public static async replyComment(
    id: number, content: string,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<HandleResponse<"commentPost">> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    let dataToGet = "id content likesCount createdAt updatedAt isLiked author { id displayName icon user { username email } }";
    dataToGet = `${dataToGet} parentComment { ${dataToGet} }`;
    
    const query  = {
      query: `mutation replyComment($commentId: Int!, $content: String!) { replyComment(commentId: $commentId, content: $content) { ${dataToGet} } }`,
      variables: {
        commentId: id,
        content: content
      }
    };

    const response = await this.request("/graphql", JSON.stringify(query), headers, useServer);
    return await this.handleResponse<"replyComment">(response, "replyComment", useServer)!;
  }
}