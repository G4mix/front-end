import type { GenericQueryResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import { APIManager } from "@classes/APIManager/base";

export class CommentQueryManager extends APIManager {
  public static async findAllCommentsOfAPost(
    id: number, skip: number,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericQueryResponse<"findAllCommentsOfAPost">["data"]["findAllCommentsOfAPost"] | undefined> {
    const accessToken = APIManager.getCookie("accessToken", useServer);
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };

    let dataToGet = "id content likesCount createdAt updatedAt isLiked author { id displayName user { username email icon } }";
    dataToGet = `${dataToGet} replies { ${dataToGet} }`;

    const query  = {
      query: `query findAllCommentsOfAPost($postId: Int!, $skip: Int, $limit: Int) { findAllCommentsOfAPost(postId: $postId, skip: $skip, limit: $limit) { ${dataToGet} } }`,
      variables: {
        postId: id,
        skip: skip,
        limit: 10
      }
    };
    
    const response = await APIManager.request("/graphql", JSON.stringify(query), headers, useServer);
    
    const data: GenericQueryResponse<"findAllCommentsOfAPost"> = await response.json();
    return data["data"]["findAllCommentsOfAPost"];
  }
}