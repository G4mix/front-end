"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import { Checkbox } from "@components/Checkbox";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import Link from "next/link";
import signinStyles from "./signinForm.module.css";
import { APIManager } from "@/app/_classes/APIManager";
import { useRouter } from "next/navigation";

export function LoginForm({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [readyToLogin, setReadyToLogin] = useState<boolean>(false);

  const hasGmailDomain = (email: string) => /@gmail\.com$/.test(email);

  const isReadyToLogin = () => {
    if (
      usernameOrEmail.length > 5 && 
      password
    ) {
      setReadyToLogin(true);
    } else {
      setReadyToLogin(false);
    }
  };

  async function login(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();

    const signInBody: { password: string; rememberMe: boolean; username?: string; email?: string; } = { password, rememberMe };

    signInBody[hasGmailDomain(usernameOrEmail) ? "email" : "username"] = usernameOrEmail;
    
    await APIManager.signIn(signInBody);
  }

  useEffect(() => {
    isReadyToLogin();
    return () => {};
  }, [password, usernameOrEmail]);


  return (
    <form onSubmit={readyToLogin ? (e) => login(e) : () => null}>
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
        <p>
          <Link href="/auth/forgotpassword">Esqueceu sua senha?</Link>{" "}
        </p>
      </div>
      {children}
      <div className={signinStyles.rememberMe}>
        <Checkbox defaultChecked={rememberMe} onChange={(e: ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)} />
        <p>Lembrar de mim por 30 dias</p>
      </div>
      <Button disabled={!readyToLogin} type="submit">Conectar-se</Button>
    </form>
  );
}