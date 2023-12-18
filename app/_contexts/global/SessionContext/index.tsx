"use client";

import type { Session, SessionContextProps } from "./Session.types";
import React, { useState, createContext, useCallback } from "react";
import { CookieManager } from "@/app/_classes/CookieManager";

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

  const update = useCallback((newData: Session) => {
    setSession((prevSession) => 
      prevSession ? { ...prevSession, ...newData } : newData
    );

    console.log(newData);
  }, []);

  const setUnauthenticated = useCallback(async () => {
    setSession(null);
    await CookieManager.delete({ useServer: false });
  }, []);

  console.log(session);

  return (
    <SessionContext.Provider value={{ session, update, setUnauthenticated }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return React.useContext(SessionContext);
};