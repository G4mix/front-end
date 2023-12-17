export function getCookieClient() {
  const allCookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const targetCookie = allCookies.find((cookie) => cookie.startsWith("accessToken" + "="));

  return targetCookie ? targetCookie.substring("accessToken".length + 1) : undefined;
}