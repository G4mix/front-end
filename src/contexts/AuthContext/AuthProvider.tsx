"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { IUserProfile } from "@/interfaces/user";
import { usePathname, useRouter } from "next/navigation";
import { API_URL } from "@/config";
import {
  ILogin,
  ILoginResponse,
  IRegister,
  IRegisterResponse,
} from "@/interfaces/auth";
import { deleteCookie } from "cookies-next/client";
import { defaultHeaders, handleError, setAuthTokens } from "@/api/utils";
import { getMyUserProfile } from "@/api/queries/user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const isAuthRoute = pathname.startsWith("/auth");

  const authenticate = async () => {
    const data = await getMyUserProfile();

    setIsAuthenticated(true);
    setUserProfile(data);
  };

  useEffect(() => {
    if (!userProfile && !isAuthenticated && !isAuthRoute) {
      authenticate();
    }
  }, [userProfile, isAuthenticated, isAuthRoute]);

  const signin = async (body: ILogin) => {
    try {
      const res = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: defaultHeaders,
      });

      await handleError(res);

      const data: ILoginResponse = await res.json();

      setAuthTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      setIsAuthenticated(true);
      setUserProfile(data.userProfile);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (body: IRegister) => {
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: defaultHeaders,
      });

      await handleError(res);

      const data: IRegisterResponse = await res.json();

      setAuthTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      setIsAuthenticated(true);
      setUserProfile(data.userProfile);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");

    setIsAuthenticated(false);
    setUserProfile(null);

    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userProfile, signin, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
