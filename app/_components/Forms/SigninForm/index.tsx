"use client";

import { useMessagesContext } from "@contexts/global/MessagesContext";
import { UserAuthManager } from "@classes/APIManager/user/UserAuthManager";
// import { useRouter } from "next/navigation";
import { apiErrors } from "@constants/apiErrors";
import { Checkbox } from "@components/Checkbox";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Text } from "@components/Text";
import React, { useState, useRef } from "react";
import signinStyles from "./signinForm.module.css";
import signupFormStyle from "@components/Forms/SignupForm/signupForm.module.css";
import Link from "next/link";
import { useSession } from "@contexts/global/SessionContext";

type LoginProps = {
  password: string;
  email: string;
};

export const LoginForm = ({ children }: { children: React.ReactNode }) => {
  const { handleShowMessage } = useMessagesContext();
  const [tryingToLogIn, setTryingToLogIn] = useState(false);
  const { updateSession } = useSession();
  const registerForm = useRef<HTMLFormElement>(null);
  // const router = useRouter();

  const login = async (signInBody: LoginProps) => {
    const response = await UserAuthManager.signIn(signInBody);
    
    if (response && response!.error!) {
      setTryingToLogIn(false);
      if (response && apiErrors.includes(response.error!)) {
        handleShowMessage(response.message!);
        return;
      }
      handleShowMessage("Erro ao fazer o login");
      return;
    }

    updateSession();
    // router.push("/");
    setTryingToLogIn(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (tryingToLogIn) return;
    setTryingToLogIn(true);

    const formData = new FormData(registerForm.current || e.currentTarget);

    const usernameOrEmail = formData.get("username_or_email")?.valueOf() as string;
    const password = formData.get("password")?.valueOf() as string;

    const signInBody: LoginProps = { password, email: usernameOrEmail };

    login(signInBody);
  };

  return (
    <form onSubmit={onSubmit} className={signupFormStyle.form}>
      <div className={signinStyles.form}>
        <div className={signupFormStyle.fields}>
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
      <div className={signupFormStyle.accept}>
        <Checkbox defaultChecked={false} name="remember_me" />
        <Text size="xs">Lembrar de mim por 3 dias</Text>
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