export const getCookieServer = async (name: "accessToken" | "refreshToken") => {
  const response = await fetch(`/api/getCookie?name=${name}`, {
    method: "GET"
  });
  const data = await response.json();
  return data[name] as string | undefined;
};