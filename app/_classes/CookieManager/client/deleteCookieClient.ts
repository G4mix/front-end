export const deleteCookieClient = (name: "accessToken" | "refreshToken") => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};