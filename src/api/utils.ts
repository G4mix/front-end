import { API_URL } from "@/config";
import { IRefreshTokenRequestResponse } from "@/interfaces/auth";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const defaultHeaders = {
  "Content-Type": "application/json",
};

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? "Not Found");
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
  }
}

export const clearCookieAndRedirect = (redirect = "/auth/login") => {
  deleteCookie("refreshToken");
  deleteCookie("accessToken");

  window.location.href = redirect;
};

const getBodyMessage = async (res: Response) => {
  if (res.headers.get("content-type")?.includes("application/json")) {
    const response = await res.json();

    return (response.message as string) || "Internal server error";
  }
};

const identifyAccessDenied = async (res: Response, noRetry = false) => {
  const refreshToken = getCookie("refreshToken")?.toString();
  const isUnauthorized = res.status === 401;

  if (noRetry && isUnauthorized) {
    clearCookieAndRedirect();

    throw new UnauthorizedError();
  }

  if (isUnauthorized && refreshToken) {
    await refreshTokenRequest(refreshToken);
  }
};

export const getHeaderOptions = (
  { emptyContentType } = { emptyContentType: false }
) => {
  const token = getCookie("accessToken")?.toString();

  const headers = emptyContentType ? {} : defaultHeaders;

  return !!token
    ? {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
};

export const refreshTokenRequest = async (refreshToken: string) => {
  const res = await fetch(`${API_URL}/auth/refresh-token`, {
    method: "POST",
    body: JSON.stringify({ token: refreshToken }),
    ...getHeaderOptions(),
  });

  const data: IRefreshTokenRequestResponse = await res.json();

  await handleError(res, true);

  setCookie("accessToken", data.accessToken);
  setCookie("refreshToken", data.refreshToken);

  window.location.reload();
};

export const handleError = async (res: Response, noRetry = false) => {
  await identifyAccessDenied(res, noRetry);

  if (res.ok === false || res.status >= 400) {
    const isNotFounded = res.status === 404;
    const message = await getBodyMessage(res);

    if (isNotFounded) {
      throw new NotFoundError(message);
    }

    throw new Error(message ?? "Error connecting to the server");
  }
};
