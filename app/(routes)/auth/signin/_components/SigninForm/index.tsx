"use client";

import { hasGmailDomain, isValidUsername } from "@functions/formValidations";
import { useMessagesContext } from "@contexts/MessagesContext";
import { APIManager } from "@classes/APIManager";
import { useRouter } from "next/navigation";
import { apiErrors } from "@constants/apiErrors";
import { Checkbox } from "@components/Checkbox";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Text } from "@components/Text";
import React, { useState, useRef } from "react";
import signinStyles from "./signinForm.module.css";
import Link from "next/link";

type LoginProps = {
  password: string;
  rememberMe: boolean;
  username?: string;
  email?: string;
};

export const LoginForm = ({ children }: { children: React.ReactNode }) => {
  const { handleShowMessage } = useMessagesContext();
  const [tryingToLogIn, setTryingToLogIn] = useState(false);
  const registerForm = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const login = async (signInBody: LoginProps) => {
    const errorMessage = await APIManager.signIn(signInBody);
    
    if (errorMessage) {
      setTryingToLogIn(false);
      if (apiErrors.includes(errorMessage)) {
        handleShowMessage(errorMessage);
        return;
      }
      handleShowMessage("Erro ao fazer o login");
      return;
    }

    router.push("/");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (tryingToLogIn) return;
    setTryingToLogIn(true);

    const formData = new FormData(registerForm.current || e.currentTarget);

    const usernameOrEmail = formData.get("username_or_email")?.valueOf() as string;
    const password = formData.get("password")?.valueOf() as string;
    const rememberMe = formData.get("remember_me")?.valueOf() as string;

    const signInBody: LoginProps = { password, rememberMe: !!rememberMe };
    signInBody[hasGmailDomain(usernameOrEmail) ? "email" : "username"] = usernameOrEmail;

    if (!isValidUsername(usernameOrEmail) && !hasGmailDomain(usernameOrEmail)) {
      handleShowMessage("Nome de usuário ou e-mail inválido.");
      return;
    } else if (usernameOrEmail.length < 3) {
      handleShowMessage("Nome de usuário ou e-mail muito curto.");
      return;
    } else if (password.length < 7) {
      handleShowMessage("Senha muito curta.");
      return;
    }

    login(signInBody);
  };

  return (
    <form onSubmit={onSubmit} >
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