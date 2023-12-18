import type { GenericQueryRequest } from "@classes/APIManager/base/types/GraphQLRequest.types";
import type { HandleResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import { APIManager } from "@classes/APIManager/base";

export class UserQueryManager extends APIManager {
  public static async findUserByToken(
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<HandleResponse<"findUserByToken">> {
    const headers: HeadersInit = { "Content-Type": "application/json" };

    const query: GenericQueryRequest<"findUserByToken"> = { query: "query { findUserByToken { username userProfile { icon } } }" };
    const response = await APIManager.request("/graphql", JSON.stringify(query), headers, useServer);
    return await this.handleResponse<"findUserByToken">(response, "findUserByToken", useServer);
  }
}