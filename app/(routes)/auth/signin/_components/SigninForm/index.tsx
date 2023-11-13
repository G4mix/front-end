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
  const rememberMeRef = useRef<HTMLInputElement>(null);
  const errorsToastRef = useRef<ErrorsToastHandlers>(null);
  const usernameOrEmailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [tryingToLogIn, setTryingToLogIn] = useState(false);

  const login = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (tryingToLogIn) return;
    setTryingToLogIn(true);

    const password = passwordRef.current!.value;

    const signInBody: { password: string; rememberMe: boolean; username?: string; email?: string; } = {
      password: password,
      rememberMe: rememberMeRef.current!.checked
    };

    const usernameOrEmail = usernameOrEmailRef.current!.value;
    
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
    <form onSubmit={(e) => login(e)}>
      <ErrorsToast ref={errorsToastRef} />
      <div className={signinStyles.form}>
        <div className={signinStyles.fields}>
          <Input
            icon="user"
            label="Username"
            name="username"
            placeholder="Digite um nome de usuário válido"
            type="text"
            ref={usernameOrEmailRef}
          />
          <Input
            icon="lock"
            label="Senha"
            name="password"
            placeholder="Digite uma senha"
            type="password"
            ref={passwordRef}
          />
        </div>
        <Text size="xs" asChild className={signinStyles.forgotPassword}>
          <Link href="/auth/forgotpassword">Esqueceu sua senha?</Link>
        </Text>
      </div>
      {children}
      <div className={signinStyles.rememberMe}>
        <Checkbox defaultChecked={false} ref={rememberMeRef} />
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