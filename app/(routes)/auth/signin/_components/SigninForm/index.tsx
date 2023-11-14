"use client";

import { hasGmailDomain, isValidUsername } from "@functions/formValidations";
import { ErrorsToast, ErrorsToastHandlers } from "@components/ErrorsToast";
import { APIManager } from "@classes/APIManager";
import { apiErrors } from "@constants/apiErrors";
import { useRouter } from "next/navigation";
import { Checkbox } from "@components/Checkbox";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Text } from "@components/Text";
import React, { useState, useCallback, useRef } from "react";
import signinStyles from "./signinForm.module.css";
import Link from "next/link";

export const LoginForm = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const errorsToastRef = useRef<ErrorsToastHandlers>(null);
  const registerForm = useRef<HTMLFormElement>(null);
  const [tryingToLogIn, setTryingToLogIn] = useState(false);

  const login = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (tryingToLogIn) return;
    setTryingToLogIn(true);

    const formData = new FormData(registerForm.current || e.currentTarget);

    const usernameOrEmail = formData.get("username_or_email")?.valueOf() as string;
    const password = formData.get("password")?.valueOf() as string;
    const rememberMe = formData.get("remember_me")?.valueOf() as string;
    
    if (!isValidUsername(usernameOrEmail) && !hasGmailDomain(usernameOrEmail)) {
      errorsToastRef.current?.showError("Nome de usuário ou e-mail inválido.");
      return;
    } else if (usernameOrEmail.length < 3) {
      errorsToastRef.current?.showError("Nome de usuário ou e-mail muito curto.");
      return;
    } else if (password.length < 7) {
      errorsToastRef.current?.showError(apiErrors["PASSWORD_TOO_SHORT"]);
      return;
    }

    const signInBody: { password: string; rememberMe: boolean; username?: string; email?: string; } = {
      password, rememberMe: !!rememberMe
    };
    
    signInBody[hasGmailDomain(usernameOrEmail) ? "email" : "username"] = usernameOrEmail;
    
    const result = await APIManager.signIn(signInBody);
    
    if (apiErrors[result!]) {
      setTryingToLogIn(false);
      errorsToastRef.current?.showError(apiErrors[result!]);
      return;
    }

    router.push("/");
  }, []);

  return (
    <form onSubmit={(e) => login(e)} >
      <ErrorsToast ref={errorsToastRef} />
      <div className={signinStyles.form}>
        <div className={signinStyles.fields}>
          <Input
            icon="user"
            label="Username"
            name="username_or_email"
            placeholder="Digite seu nome de usuário ou e-mail"
            type="text"
          />
          <Input
            icon="lock"
            label="Senha"
            name="password"
            placeholder="Digite uma senha"
            type="password"
          />
        </div>
        <Text size="xs" asChild className={signinStyles.forgotPassword}>
          <Link href="/auth/forgotpassword">Esqueceu sua senha?</Link>
        </Text>
      </div>
      {children}
      <div className={signinStyles.rememberMe}>
        <Checkbox defaultChecked={false} name="remember_me" />
        <Text size="xs">Lembrar de mim por 30 dias</Text>
      </div>
      <Button
        style={{
          width: "100%",
          marginTop: "1rem",
          marginBottom: "0.1rem",
        }}
        type="submit"
      >
        Conectar-se
      </Button>
    </form>
  );
};