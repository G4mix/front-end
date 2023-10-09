export interface CookieStore {
  get(name: "accessToken" | "refreshToken"): string | undefined;
  delete(name: "accessToken" | "refreshToken"): void;
  set(cookie: string): void;
}