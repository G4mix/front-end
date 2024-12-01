import type { ApiResponse } from "./types/response";
import type { RequestMethod, URL } from "./types/request";
import { getCookie, setCookie } from "@functions/cookies";
import { getJWTPayload } from "@/app/_functions/getJwtPayload";

type RequestProps = {
	url: URL;
	body?: string | FormData;
	headers?: HeadersInit;
	method?: "POST" | "GET" | "DELETE" | "PATCH" | "PUT";
	baseUrl?: string;
	withAuth?: boolean;
}

export class APIManager {
  public static async request<U extends RequestMethod>({
    url,
    body,
    baseUrl=`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}/api/v1`,
    headers = {},
    method = "POST",
    withAuth=true
  }: RequestProps): Promise<void | ApiResponse<U>> {
    try {
      if (!("Authorization" in headers) && withAuth) {
        headers["Authorization" as keyof typeof headers] = `Bearer ${getCookie("token")}`;
      }
      const response = await fetch(`${baseUrl}${url}`, { method, headers, body });
      const token = response.headers.get("Authorization");
      if (token) {
        setCookie("token", token.substring(7), 1);
        const payload = getJWTPayload({ token });
        if (payload && "user" in payload) {
          setCookie("user", JSON.stringify(payload.user), 1);
        }  
      }
      return await APIManager.handleResponse<U>(response);
    } catch (error) {
      console.error(error);
      return error as ApiResponse<U>;
    }
  }

  private static async handleResponse<U extends RequestMethod>(
    response: Response
  ): Promise<void | ApiResponse<U>> {
    try {
      const dataJson = await response.json() as ApiResponse<U>;			
      if (dataJson?.message || [400, 401, 403, 404, 500].includes(response.status)) {
        let errorMessage: string | undefined = dataJson.message;
        if (response.status === 500 && !errorMessage) errorMessage = response.statusText || "FETCH_ERROR";
        return { message: dataJson.message || errorMessage } as ApiResponse<U>;
      }

      if ("user" in dataJson) {
        setCookie("user", JSON.stringify(dataJson.user), 1);
      }

      return dataJson;
    } catch (err) {
      return {} as ApiResponse<U>;
    }
  }
}
