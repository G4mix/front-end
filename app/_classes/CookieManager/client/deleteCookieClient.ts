export function deleteCookieClient() {
  document.cookie = "token=undefined; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/auth/signin";
}