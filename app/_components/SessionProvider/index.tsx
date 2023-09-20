"use client";

import { getCookie } from "@functions/getCookie";
import { fetchAPI } from "@functions/fetchAPI";
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

    const toFetch = fetchAPI.mount("/graphql", {
      body: {
        "query": "query ($accessToken: String!) { findUserByToken(accessToken: $accessToken) { username email icon } }",
        "variables": {
          "accessToken": getCookie("accessToken")
        }
      }        
    });

    function setUnauthenticated() {
      setSession(null);
      setStatus("unauthenticated");
    }

    const response = await fetchAPI.execute(toFetch);
    console.log(response);
    if (!response || response!.message === "INVALID_ACCESS_TOKEN") {
      setUnauthenticated();
      return;
    }

    const { username, email, icon } = response.data!.findUserByToken!;

    setSession({
      accessToken: getCookie("accessToken"),
      username: username!,
      email: email!,
      icon: icon!
    });

    setStatus("authenticated");
  }

  React.useEffect(() => {
    fetchData();
    return () => {
      
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session, status, update }}>
      {children}
    </SessionContext.Provider>
  );
}