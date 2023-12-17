export function setCookieClient(accessToken: string) {
  const twoHoursInSeconds = 7200;

  const currentDate = new Date();
  currentDate.setTime(currentDate.getTime() + (twoHoursInSeconds * 1000));

  const cookieOptions = `path=/; max-age=${twoHoursInSeconds}; SameSite=Lax; expires=${currentDate.toUTCString()}`;

  document.cookie = `accessToken=${accessToken}; ${cookieOptions}`;
}