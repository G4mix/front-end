import { UserI } from "@contexts/global/SessionContext";

export type Claims = {
	sub: string;
	verifiedEmail?: boolean;
	ipAddress?: string;
	exp?: number;
	user: UserI;
}

export const getJWTPayload = ({ token }: { token: string; }): Claims | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(atob(base64).split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (_e) {
    return null;
  }
};
