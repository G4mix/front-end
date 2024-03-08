export function getCookieClient() {
  const allCookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const targetCookie = allCookies.find((cookie) => cookie.startsWith("token" + "="));

  return targetCookie ? targetCookie.substring("token".length + 1) : undefined;
}