"use client";

import type { Session, SessionContextProps } from "./Session.types";
import React, { useState, useEffect, createContext } from "react";
import { CookieManager } from "@classes/CookieManager";
import { APIManager } from "@classes/APIManager";

export const SessionContext = createContext<SessionContextProps>({
  session: null, 
  status: "loading",
  update: () => {}
});

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSession] = useState<SessionContextProps["session"]>({ username: null, email: null, icon: null, accessToken: null });
  const [status, setStatus] = useState<SessionContextProps["status"]>("loading");

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
      APIManager.signOut();
    }

    const accessTokenFromCookie = CookieManager.get("accessToken");
    const refreshTokenFromCookie = CookieManager.get("refreshToken");

    if (!accessTokenFromCookie || !refreshTokenFromCookie) return setUnauthenticated();

    const data = await APIManager.findUserByToken()!;

    if (!data) return setUnauthenticated();

    const { username, email, icon } = data;

    setSession({
      accessToken: accessTokenFromCookie,
      username: username!,
      email: email!,
      icon: icon!
    });

    setStatus("authenticated");
  }

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <SessionContext.Provider value={{ session, status, update }}>
      {children}
    </SessionContext.Provider>
  );
}