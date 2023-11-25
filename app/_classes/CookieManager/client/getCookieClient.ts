export const getCookieClient = (name: "accessToken" | "refreshToken") => {
  const allCookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const targetCookie = allCookies.find((cookie) => cookie.startsWith(name + "="));

  return targetCookie ? targetCookie.substring(name.length + 1) : undefined;
};