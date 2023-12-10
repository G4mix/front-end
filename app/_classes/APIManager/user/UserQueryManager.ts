import type { GenericQueryResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import type { GenericQueryRequest } from "@classes/APIManager/base/types/GraphQLRequest.types";
import { CookieManager } from "../../CookieManager";
import { APIManager } from "@classes/APIManager/base";

export class UserQueryManager extends APIManager {
  public static async findUserByToken(
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericQueryResponse<"findUserByToken">["data"]["findUserByToken"] | undefined> {
    const accessToken = CookieManager.get("accessToken", useServer);
    if (!accessToken) return;
    
    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };

    const query: GenericQueryRequest<"findUserByToken"> = { query: "query { findUserByToken { id username email userProfile { icon } } }" };
    const response = await APIManager.request("/graphql", JSON.stringify(query), headers, useServer);
    
    return await this.handleResponse<GenericQueryResponse<"findUserByToken">>(response, "findUserByToken", useServer) as GenericQueryResponse<"findUserByToken">["data"]["findUserByToken"];
  }
}