import { getClientSideCookies } from "@functions/getClientSideCookies";

export class APIManagerClientSide {
  public static async signUp(signUpBody: { username?: string, email?: string, password: string }) {
    const response = await fetch("/api/signup", {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signUpBody),
      method: "POST"
    });

    const data = await response.json();
    
    const cookieStore = getClientSideCookies();
    cookieStore.set(data.accessToken);
    cookieStore.set(data.refreshToken);
  }
}