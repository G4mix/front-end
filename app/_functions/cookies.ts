export function setCookie(cname: string, cvalue: string, exhours: number = 1) {
  const d = new Date();
  const oneHourInMilliseconds = 60 * 60 * 1000;

  d.setTime(d.getTime() + exhours * oneHourInMilliseconds);
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname: string) {
  if (typeof window === "undefined") return;

  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
}

export function clearCookies() {
  for (const value of ["token", "user"]) { 
    setCookie(value, "", 0);
  }
}

export function parseCookies(cookieString: string) {
  const cookies: { [key: string]: unknown } = {};
  const pairs = cookieString.split("; ");

  pairs.forEach(pair => {
    const [key, value] = pair.split("=");
    try {
      cookies[key as keyof typeof cookies] = JSON.parse(decodeURIComponent(value));
    } catch (e) {
      cookies[key as keyof typeof cookies] = decodeURIComponent(value);
    }
  });

  return cookies;
}