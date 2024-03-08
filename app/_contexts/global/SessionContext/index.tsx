"use client";

import type { Session, SessionContextProps } from "./Session.types";
import React, { useState, createContext, useCallback, useEffect } from "react";
import { UserQueryManager } from "@/app/_classes/APIManager/user/UserQueryManager";
import { CookieManager } from "@/app/_classes/CookieManager";
import { usePathname } from "next/navigation";

export const SessionContext = createContext<SessionContextProps>({
  session: null, 
  update: () => null,
  setUnauthenticated: () => null
});

type SessionProviderProps = {
  children: React.ReactNode;
};

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<SessionContextProps["session"]>(null);
  const pathname = usePathname();

  const update = useCallback((newData: Session) => {
    setSession((prevSession) => 
      prevSession ? { ...prevSession, ...newData } : newData
    );
  }, []);

  const setUnauthenticated = useCallback(async () => {
    setSession(null);
    await CookieManager.delete({ useServer: false });
  }, []);

  const fetchData = async () => {
    if (["/auth/signup", "/auth/signin"].includes(pathname)) return;
    const data = await UserQueryManager.findUserByToken({ useServer: false })!;
    if (!data || (data && data.error)) return CookieManager.delete({ useServer: false });
    setSession({ username: data.username, icon: data.userProfile!.icon });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SessionContext.Provider value={{ session, update, setUnauthenticated }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return React.useContext(SessionContext);
};