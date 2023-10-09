import type { CookieStore } from "./CookieStore";
import { cookies } from "next/headers";

export async function getServerSideCookies(): Promise<CookieStore> {
  "use server";
  return {
    get: (name) => cookies().get(name)!.value,
    delete: (name) => cookies().delete(name),
    set: (cookie) => {
      const cookieFields = cookie.split(';').map(field => field.trim());
      const cookieObject: any = ["", ""];
    
      for (const field of cookieFields) {
        const [key, value] = field.split('=');
        if (key && value) {
          cookieObject[0] = key;
          cookieObject[1] = value;
        }
      }

      console.log("Cookie object >>>>> "+cookieObject);

      cookies().set({
        name: cookieObject[0],
        value: cookieObject[1],
        ...cookieObject[2],
      });
    }
  };
}
