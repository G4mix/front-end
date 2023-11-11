"use client";

import type { Session, SessionContextProps } from "./Session.types";
import React, { useState, useEffect, createContext } from "react";
import { APIManager } from "@classes/APIManager";
import { usePathname } from "next/navigation";
import { CookieManager } from "@/app/_classes/CookieManager";

export const SessionContext = createContext<SessionContextProps>({
  session: null, 
  status: "loading",
  update: () => {}
});

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSession] = useState<SessionContextProps["session"]>(null);
  const [status, setStatus] = useState<SessionContextProps["status"]>("loading");
  const toIgnoreRoutes = ["/auth/signin", "/auth/signup", "/auth/signout"];
  const pathname = usePathname();  

  function update(newData?: Partial<Session>) {
    setSession((prevSession) => 
      prevSession ? { ...prevSession, ...newData } : null
    );
  }

  function setUnauthenticated() {
    setSession(null);
    setStatus("unauthenticated");
    APIManager.signOut( );
  }
  
  async function fetchData() {
    if (toIgnoreRoutes.includes(pathname)) {
      setSession(null);
      setStatus("unauthenticated");
      return <>{children}</>;
    }

    setStatus("loading");

    const data = await APIManager.findUserByToken()!;
    if (!data) return setUnauthenticated();
    const { username, email, icon } = data;

    setSession({
      accessToken: CookieManager.get("accessToken")!,
      username: username!,
      email: email!,
      icon: icon!
    });

    setStatus("authenticated");
  }

  useEffect(() => {
    fetchData();
    return () => {};
  }, [pathname]);

  return (
    <SessionContext.Provider value={{ session, status, update }}>
      {children}
    </SessionContext.Provider>
  );
}