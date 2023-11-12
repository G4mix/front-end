"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import { ErrorsToast } from "@components/ErrorsToast";
import { APIManager } from "@classes/APIManager";
import { useRouter } from "next/navigation";
import { Checkbox } from "@components/Checkbox";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Text } from "@components/Text";
import Link from "next/link";
import signinStyles from "./signinForm.module.css";
import { apiErrors } from "@constants/apiErrors";

export const LoginForm = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [tryingToLogIn, setTryingToLogIn] = useState(false);

  const [readyToLogin, setReadyToLogin] = useState<boolean>(false);

  const [error, setError] = useState<keyof typeof apiErrors | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const hasGmailDomain = (email: string) => /@gmail\.com$/.test(email);
  const isValidUsername = (username: string) => /^[A-Za-z0-9_]+$/.test(username);

  const isReadyToLogin = () => {
    if (
      (isValidUsername(usernameOrEmail) || hasGmailDomain(usernameOrEmail)) &&
      usernameOrEmail.length > 2 &&
      password
    ) {
      setReadyToLogin(true);
    } else {
      setReadyToLogin(false);
    }
  };

  async function login(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    if (tryingToLogIn) return;
    setTryingToLogIn(true);

    const signInBody: { password: string; rememberMe: boolean; username?: string; email?: string; } = { password, rememberMe };

    signInBody[hasGmailDomain(usernameOrEmail) ? "email" : "username"] = usernameOrEmail;
    
    const result = await APIManager.signIn(signInBody);
    
    if (apiErrors[result!]) {
      setTryingToLogIn(false);
      setError(result!);
      setOpen(true);
      return;
    }

    router.push("/");
  }

  useEffect(() => {
    isReadyToLogin();
    return () => {};
  }, [password, usernameOrEmail]);

  return (
    <form onSubmit={readyToLogin ? (e) => login(e) : () => null}>
      <ErrorsToast error={error!} open={open} setOpen={setOpen}/>
      <div className={signinStyles.form}>
        <div className={signinStyles.fields}>
          <Input
            icon="user"
            label="Username"
            name="username"
            placeholder="Digite um nome de usuário válido"
            type="text"
            value={usernameOrEmail}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsernameOrEmail(e.target.value)}
          />
          <Input
            icon="lock"
            label="Senha"
            name="password"
            placeholder="Digite uma senha"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </div>
        <Text size="xs" asChild className={signinStyles.forgotPassword}>
          <Link href="/auth/forgotpassword">Esqueceu sua senha?</Link>
        </Text>
      </div>
      {children}
      <div className={signinStyles.rememberMe}>
        <Checkbox defaultChecked={rememberMe} onChange={(e: ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)} />
        <Text size="xs">Lembrar de mim por 30 dias</Text>
      </div>
      <Button
        style={{
          width: "100%",
          marginTop: "1rem",
          marginBottom: "0.1rem",
        }}
        disabled={!readyToLogin} 
        type="submit"
      >
        Conectar-se
      </Button>
    </form>
  );
}