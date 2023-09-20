import { getCookie } from "../getCookie";

type fetchAPIBaseURLs = "/auth/signin" | "/auth/signout" | "/auth/refreshtoken" | "/auth/signup" | "/graphql";

type fetchAPIBaseHeaders = {
  Authorization?: string;
}

type fetchAPIBaseBody = {
  refreshToken?: string;
  variables?: { accessToken?: string; };
  password?: string;
  username?: string;
  mutation?: string;
  email?: string;
  query?: string;
}

type fetchAPIBaseFields = {
  method?: "POST" | "GET"
  headers?: fetchAPIBaseHeaders,
  body?: fetchAPIBaseBody
}

interface FetchToDoRes extends Response {
  refreshToken?: string;
  accessToken?: string;
  variables?: string;
  data?: { findUserByToken?: { username?: string; email?: string; icon?: string; } }
  message?: "INVALID_ACCESS_TOKEN" | "INVALID_REFRESH_TOKEN";
}

export async function fetchAPIBase(url: fetchAPIBaseURLs, { method="POST", headers={Authorization: "Bearer "+getCookie("accessToken")}, body={} }: fetchAPIBaseFields): Promise<FetchToDoRes> {
  const response = await fetch(`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...headers as HeadersInit
    },
    body: JSON.stringify(body)
  });
  return await response.json();
}