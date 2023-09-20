import { fetchAPIBase } from "@functions/fetchAPI/fetchAPIBase";
import { getCookie } from "@functions/getCookie";

export async function fetchAPIExecute(fetchToDo: () => ReturnType<typeof fetchAPIBase>) {
  const response = await fetchToDo();

  if (response.message === "INVALID_ACCESS_TOKEN") {
    const refreshTokenResponse = await fetchAPIBase("/auth/refreshtoken", {
      body: {
        refreshToken: getCookie("refreshToken")
      }
    });

    if (refreshTokenResponse.message === "INVALID_REFRESH_TOKEN") {
      window.location.href = "/login";
      return;
    }
        
    return await fetchToDo();
  }

  return response;
}