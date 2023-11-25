export const deleteCookieServer = async (name: "accessToken" | "refreshToken") => {
  await fetch(`/api/deleteCookie?name=${name}`, { method: "DELETE" });
};