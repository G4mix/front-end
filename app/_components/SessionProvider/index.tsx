"use client";

import { getClientSideCookies } from "@/app/_functions/getClientSideCookies";
import React from "react";

interface Session {
  accessToken: string | null;
  username: string | null;
  email: string | null;
  icon: string | null;
}

interface SessionContextProps {
  session: Session | null;
  status: "unauthenticated" | "authenticated" | "loading";
  update: () => void;
}

export const SessionContext = React.createContext<SessionContextProps>({
  session: null, 
  status: "unauthenticated",
  update: () => {} 
});

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSession] = React.useState<SessionContextProps["session"]>({ username: null, email: null, icon: null, accessToken: null });
  const [status, setStatus] = React.useState<SessionContextProps["status"]>("unauthenticated");

  function update(newData?: Partial<Session>) {
    setSession((prevSession) => 
      prevSession ? { ...prevSession, ...newData } : null
    );
  }

  async function fetchData() {
    setStatus("loading");

    function setUnauthenticated() {
      setSession(null);
      setStatus("unauthenticated");
    }
    const cookieManager = getClientSideCookies();
    const accessTokenFromCookie = cookieManager.get("accessToken");
    const refreshTokenFromCookie = cookieManager.get("refreshToken");

    if (!accessTokenFromCookie || !refreshTokenFromCookie) {
      setUnauthenticated();
      return;
    }

    const response = await fetch("/api/getSession");

    const data = await response.json();

    console.log(data);
    if (!data || data!.message === "INVALID_REFRESH_TOKEN") {
      setUnauthenticated();
      return;
    }

    const { username, email, icon } = data!.findUserByToken!;

    setSession({
      accessToken: accessTokenFromCookie,
      username: username!,
      email: email!,
      icon: icon!
    });

    setStatus("authenticated");
  }

  React.useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <SessionContext.Provider value={{ session, status, update }}>
      {children}
    </SessionContext.Provider>
  );
}