"use client";

import type { Session, SessionContextProps } from "./Session.types";
import { CookieManager } from "@classes/CookieManager";
import { usePathname } from "next/navigation";
import { APIManager } from "@classes/APIManager";
import React, { useState, useEffect, createContext, useCallback } from "react";

export const SessionContext = createContext<SessionContextProps>({
  session: null, 
  status: "loading",
  update: () => null,
  setUnauthenticated: () => null
});

type SessionProviderProps = {
  children: React.ReactNode;
};

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<SessionContextProps["session"]>(null);
  const [status, setStatus] = useState<SessionContextProps["status"]>("loading");
  const pathname = usePathname();
  const toIgnoreRoutes = ["/auth/signin", "/auth/signup"];

  const update = useCallback((newData?: Partial<Session>) => {
    setSession((prevSession) => 
      prevSession ? { ...prevSession, ...newData } : null
    );
  }, []);

  const setUnauthenticated = useCallback(() => {
    setSession(null);
    setStatus("unauthenticated");
    APIManager.signOut();
  }, []);
  
  async function fetchData() {
    if (toIgnoreRoutes.includes(pathname)) {
      setUnauthenticated();
      return <>{children}</>;
    }

    setStatus("loading");

    const data = await APIManager.findUserByToken()!;
    if (!data || data.error) return setUnauthenticated();
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
  }, [pathname]);

  return (
    <SessionContext.Provider value={{ session, status, update, setUnauthenticated }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return React.useContext(SessionContext);
};