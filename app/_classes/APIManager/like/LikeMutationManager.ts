import type { GenericMutationResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import { APIManager } from "@classes/APIManager/base";

export class LikeMutationManager extends APIManager {
  public static async likePost(
    id: number,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericMutationResponse<"likePost">["data"]["likePost"] | undefined> {
    const accessToken = APIManager.getCookie("accessToken", useServer);
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };

    const query  = {
      query: "mutation likePost($postId: Int!) { likePost(postId: $postId) }",
      variables: {
        postId: id,
      }
    };

    const response = await APIManager.request("/graphql", JSON.stringify(query), headers, useServer);
    
    const data: GenericMutationResponse<"likePost"> = await response.json();
    return data["data"]["likePost"];
  }

  public static async unlikePost(
    id: number,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericMutationResponse<"unlikePost">["data"]["unlikePost"] | undefined> {
    const accessToken = APIManager.getCookie("accessToken", useServer);
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };

    const query  = {
      query: "mutation unlikePost($postId: Int!) { unlikePost(postId: $postId) }",
      variables: {
        postId: id,
      }
    };

    const response = await APIManager.request("/graphql", JSON.stringify(query), headers, useServer);
    
    const data: GenericMutationResponse<"unlikePost"> = await response.json();
    return data["data"]["unlikePost"];
  }
}