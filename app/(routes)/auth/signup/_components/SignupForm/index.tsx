"use client";

import Link from "next/link";

import signupFormStyles from "./signupForm.module.css";
import textStyles from "@components/Text/Text.module.css";

import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import {
  hasEightOrMoreChars, hasGmailDomain, hasNumber,
  hasOneUppercaseChar, hasSpecialChar, isValidUsername
} from "@functions/formValidations";
import { ErrorsToast, ErrorsToastHandlers } from "@components/ErrorsToast";
import { Collapsable } from "@components/Collapsable";
import { APIManager } from "@classes/APIManager";
import { useRouter } from "next/navigation";
import { apiErrors } from "@constants/apiErrors";
import { Checkbox } from "@components/Checkbox";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Text } from "@components/Text";

export const RegisterForm = () => {
  const errorsToastRef = useRef<ErrorsToastHandlers>(null);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfimPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const [isCollapsableOpen, setIsCollapsableOpen] = useState<boolean>(false);
  const [readyToRegister, setReadyToRegister] = useState<boolean>(false);

  const [tryingToRegister, setTryingToRegister] = useState(false);

  
  const router = useRouter();

  const isReadyToRegister = () => {
    if (
      hasEightOrMoreChars(password) &&
      hasNumber(password) &&
      hasSpecialChar(password) &&
      hasOneUppercaseChar(password) &&
      isValidUsername(username) &&
      username.length > 2 && 
      hasGmailDomain(email) &&
      password === confirmPassword &&
      acceptedTerms
    ) {
      setReadyToRegister(true);
    } else {
      setReadyToRegister(false);
    }
  };

  async function register(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    if (tryingToRegister) return;
    setTryingToRegister(true);

    const result = await APIManager.signUp({ username, email, password });
    if (apiErrors[result!]) {
      setTryingToRegister(false);
      errorsToastRef.current?.showError(apiErrors[result!]);
      return;
    }

    router.push("/");
  }
  
  useEffect(() => {
    isReadyToRegister();
    return () => {};
  }, [password, username, email, confirmPassword, acceptedTerms]);


  return (
    <form className={signupFormStyles.form} onSubmit={readyToRegister ? (e) => register(e) : () => null}>
      <ErrorsToast ref={errorsToastRef} />
      <div className={signupFormStyles.fields}>
        <Input
          icon="user"
          label="Username"
          name="username"
          placeholder="Digite um nome de usuário válido"
          value={username}
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => setConfimPassword(e.target.value)}
          type="password"
        />
      </div>

      <div className={signupFormStyles.rememberMe}>
        <Checkbox defaultChecked={acceptedTerms} onChange={(e: ChangeEvent<HTMLInputElement>) => setAcceptedTerms(e.target.checked)} />
        <Text size="xs">
          Eu li e concordo com os{" "}
          <Link className={textStyles.xs} href={"/terms"}>termos e políticas de privacidade</Link>
        </Text>
      </div>

      <Button
        style={{
          width: "100%",
          marginTop: "1rem",
          marginBottom: "0.1rem",
        }}
        type="submit"
        disabled={!readyToRegister}
      >
        Registrar-se
      </Button>
    </form>
  );
};
