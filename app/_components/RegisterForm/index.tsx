"use client";

import Link from "next/link";

import registerFormStyles from "./registerForm.module.css";

import { ChangeEvent, useEffect, useState } from "react";

import { Input } from "../Input";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Collapsable } from "../Collapsable";

export const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfimPassword] = useState("");

  const [isCollapsableOpen, setIsCollapsableOpen] = useState<boolean>(false);
  const [readyToRegister, setReadyToRegister] = useState<boolean>(false);

  const hasOneUppercaseChar = (text: string) => /[A-Z]/.test(text);

  const hasNumber = (text: string) => /\d/.test(text);

  const hasSpecialChar = (text: string) => /[^A-Za-z0-9]/.test(text);

  const hasEightOrMoreChars = (text: string) => text.length >= 8;

  const isReadyToRegister = () => {
    if (
      hasEightOrMoreChars(password) &&
      hasNumber(password) &&
      hasSpecialChar(password) &&
      hasOneUppercaseChar(password)
    ) {
      setReadyToRegister(true);
    } else {
      setReadyToRegister(false);
    }
  };

  useEffect(() => {
    isReadyToRegister();
  }, [password, userName]);

  return (
    <form className={registerFormStyles.form}>
      <div className={registerFormStyles.fields}>
        <Input
          icon="user"
          label="Username"
          name="username"
          placeholder="Digite um nome de usuário válido"
          value={userName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUserName(e.target.value)
          }
          type="text"
        />
        <Input
          icon="user"
          label="E-mail"
          name="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          type="email"
        />
        <Input
          icon="lock"
          label="Senha"
          name="password"
          placeholder="Digite uma senha"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          onFocus={() => setIsCollapsableOpen(true)}
          onBlur={() => setIsCollapsableOpen(false)}
          type="password"
        />
        {isCollapsableOpen && (
          <Collapsable
            open
            items={[
              {
                icon: hasOneUppercaseChar(password) ? "check" : "x",
                text: "Contém pelo menos um caractere maiúsculo",
              },
              {
                icon: hasNumber(password) ? "check" : "x",
                text: "Contém pelo menos um número",
              },
              {
                icon: hasSpecialChar(password) ? "check" : "x",
                text: "Contem pelo menos um caractere especial",
              },
              {
                icon: hasEightOrMoreChars(password) ? "check" : "x",
                text: "Contém no mínimo 8 caracteres",
              },
            ]}
          />
        )}
        <Input
          icon="lock"
          label="Confirme sua senha"
          name="password"
          placeholder="Digite sua senha novamente"
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setConfimPassword(e.target.value)
          }
          type="password"
        />
      </div>

      <div className={registerFormStyles.rememberMe}>
        <Checkbox />
        <p>
          Eu li e concordo com os{" "}
          <Link href={""}>termos e políticas de privacidade</Link>
        </p>
      </div>

      <Button
        style={{
          width: "100%",
          marginTop: "1.5rem",
          marginBottom: "0.625rem",
        }}
        type="submit"
        disabled={!readyToRegister}
      >
        Registrar-se
      </Button>
    </form>
  );
};