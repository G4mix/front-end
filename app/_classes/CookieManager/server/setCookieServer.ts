export const setCookieServer = async (cookie: string) => {
  await fetch("/api/setCookie", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cookie }),
  });
};