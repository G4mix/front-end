import type { GenericQueryResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import { APIManager } from "@classes/APIManager/base";

export class CommentQueryManager extends APIManager {
  public static async findAllCommentsOfAPost(
    id: number, skip: number,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericQueryResponse<"findAllCommentsOfAPost">["data"]["findAllCommentsOfAPost"] | undefined> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    let dataToGet = "id content likesCount createdAt updatedAt isLiked author { id displayName icon user { username email } }";
    dataToGet = `${dataToGet} parentComment { ${dataToGet} } replies { ${dataToGet} parentComment { ${dataToGet} } }`;
    
    const query  = {
      query: `query findAllCommentsOfAPost($postId: Int!, $skip: Int, $limit: Int) { findAllCommentsOfAPost(postId: $postId, skip: $skip, limit: $limit) { ${dataToGet} } }`,
      variables: {
        postId: id,
        skip: skip,
        limit: 10
      }
    };

    const response = await this.request("/graphql", JSON.stringify(query), headers, useServer);
    return (await this.handleResponse(response, useServer))["findAllCommentsOfAPost"] as GenericQueryResponse<"findAllCommentsOfAPost">["data"]["findAllCommentsOfAPost"];
  }
}