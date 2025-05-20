"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { IUser } from "@/interfaces/user";
import { usePathname, useRouter } from "next/navigation";
import { API_URL } from "@/config";
import {
  ILogin,
  ILoginResponse,
  IRegister,
  IRegisterResponse,
} from "@/interfaces/auth";
import { deleteCookie } from "cookies-next/client";
import { defaultHeaders, setAuthTokens } from "@/api/utils";
import { getUserData } from "@/api/queries/user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const isAuthRoute = pathname.startsWith("/auth");

  const authenticate = async () => {
    const data = await getUserData();

    setIsAuthenticated(true);
    setUser(data);
  };

  useEffect(() => {
    if (!user && !isAuthenticated && !isAuthRoute) {
      authenticate();
    }
  }, [user, isAuthenticated, isAuthRoute]);

  const signin = async (body: ILogin) => {
    try {
      const { accessToken, refreshToken, user }: ILoginResponse = await fetch(
        `${API_URL}/auth/signin`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: defaultHeaders,
        }
      ).then((data) => data.json());

      setAuthTokens({ accessToken, refreshToken });

      setIsAuthenticated(true);
      setUser(user);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (body: IRegister) => {
    try {
      const { accessToken, refreshToken, user }: IRegisterResponse =
        await fetch(`${API_URL}/auth/signup`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: defaultHeaders,
        }).then((data) => data.json());

      setAuthTokens({ accessToken, refreshToken });

      setIsAuthenticated(true);
      setUser(user);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");

    setIsAuthenticated(false);
    setUser(null);

    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signin, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
