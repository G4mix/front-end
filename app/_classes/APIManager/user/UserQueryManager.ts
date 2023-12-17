import type { GenericQueryResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import type { GenericQueryRequest } from "@classes/APIManager/base/types/GraphQLRequest.types";
import { APIManager } from "@classes/APIManager/base";

export class UserQueryManager extends APIManager {
  public static async findUserByToken(
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericQueryResponse<"findUserByToken">["data"]["findUserByToken"] | undefined> {
    const headers: HeadersInit = { "Content-Type": "application/json" };

    const query: GenericQueryRequest<"findUserByToken"> = { query: "query { findUserByToken { id username email userProfile { icon } } }" };
    const response = await APIManager.request("/graphql", JSON.stringify(query), headers, useServer);
    
    return (await this.handleResponse(response, useServer))["findUserByToken"] as GenericQueryResponse<"findUserByToken">["data"]["findUserByToken"];
  }
}