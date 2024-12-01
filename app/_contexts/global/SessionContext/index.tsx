"use client";

import React, { createContext, useState, useEffect } from "react";
import { clearCookies, getCookie, setCookie } from "@functions/cookies";
// import { useRouter } from "next/router";

export type UserI = {
	id: string;
	email: string;
	verified: boolean;
	username: string;
	userProfile: { icon: string; }
}

export interface Session {
	user: UserI | null;
}

interface SessionContextProps {
	session: Session;
	isAuthenticated: boolean;
	// eslint-disable-next-line no-unused-vars
	updateSession: (data?: Partial<Session>) => Session;
	makeLogout: () => void;
}

const SessionContext = createContext({} as SessionContextProps);

const SessionContextProvider = ({
  children,
}: {
	children: React.ReactNode
}) => {
  const [session, setSession] = useState<Session>({
    user: null
  });

  // const router = useRouter();

  useEffect(() => {
    const user = getCookie("user");
    const userData = (user && JSON.parse(user) || {}) as Session["user"];

    if (!["user"].some(field => !!session[field as keyof typeof session])) {
      if (Object.keys(userData!).length === 0) return;
      setSession(({
        user: userData
      }));
    }
  }, []);

  const updateSession = ({ user }: Partial<Session> | undefined = {}) => {
    const userData = JSON.parse(getCookie("user") ?? "{}");
    if (Object.keys(userData).length === 0) {
      return { user: userData };
    }
    if (!user || (user && Object.keys(user).length === 0)) user = userData as UserI;

    setCookie("user", JSON.stringify(user));
    setSession({ user });
    return { user };
  };

  const makeLogout = () => {
    clearCookies();
    // router.push("/auth/signin");
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        updateSession,
        makeLogout,
        isAuthenticated: !!session?.user,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};


export { SessionContextProvider, SessionContext };

export const useSession = (): SessionContextProps => {
  return React.useContext(SessionContext);
};