import type { GenericMutationResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import { APIManager } from "@classes/APIManager/base";

export class CommentMutationManager extends APIManager {
  public static async commentPost(
    id: number, content: string,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericMutationResponse<"commentPost">["data"]["commentPost"] | undefined> {
    const accessToken = APIManager.getCookie("accessToken", useServer);
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };
    const dataToGet = "id content likesCount createdAt updatedAt isLiked author { id displayName user { username email icon } }";
    const query  = {
      query: `mutation commentPost($postId: Int!, $content: String!) { commentPost(postId: $postId, content: $content) { ${dataToGet} } }`,
      variables: {
        postId: id,
        content: content
      }
    };

    const response = await APIManager.request("/graphql", JSON.stringify(query), headers, useServer);
    
    const data: GenericMutationResponse<"commentPost"> = await response.json();
    return data["data"]["commentPost"];
  }
}