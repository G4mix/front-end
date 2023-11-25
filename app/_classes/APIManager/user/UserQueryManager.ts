import { GenericQueryResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import { GenericQueryRequest } from "@classes/APIManager/base/types/GraphQLRequest.types";
import { APIManager } from "@classes/APIManager/base";

export class UserQueryManager extends APIManager {
  public static async findUserByToken(
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericQueryResponse<"findUserByToken">["data"]["findUserByToken"] | undefined> {
    const accessToken = APIManager.getCookie("accessToken", useServer);
    if (!accessToken) return;
    
    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };

    const query: GenericQueryRequest<"findUserByToken"> = { query: "query { findUserByToken { username email icon } }" };
    const response = await APIManager.request("/graphql", JSON.stringify(query), headers, useServer);
    
    const data: GenericQueryResponse<"findUserByToken"> = await response.json();
    return data["data"]["findUserByToken"];
  }
}