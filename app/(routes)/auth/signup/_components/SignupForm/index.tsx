"use client";

import Link from "next/link";

import signupFormStyles from "./signupForm.module.css";

import React, { ChangeEvent, useState, useRef } from "react";
import {
  hasEightOrMoreChars, hasNumber,
  hasOneUppercaseChar, hasSpecialChar
} from "@functions/formValidations";
import { Collapsable, CollapsableHandlers } from "../Collapsable";
import { useMessagesContext } from "@contexts/global/MessagesContext";
import { UserAuthManager } from "@classes/APIManager/user/UserAuthManager";
import { apiErrors } from "@constants/apiErrors";
import { useRouter } from "next/navigation";
import { Checkbox } from "@components/Checkbox";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Text } from "@components/Text";
import { useSession } from "@/app/_contexts/global/SessionContext";

type RegisterProps = {
  username: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const { handleShowMessage } = useMessagesContext();

  const collapsableRef = useRef<CollapsableHandlers>(null);
  const registerForm = useRef<HTMLFormElement>(null);

  const [passwordState, setPasswordState] = useState("");
  const [tryingToRegister, setTryingToRegister] = useState(false);
  const { update } = useSession();

  const router = useRouter();

  const register = async (signUpBody: RegisterProps) => {
    const response = await UserAuthManager.signUp(signUpBody);
    
    if (response && response!.error!) {
      setTryingToRegister(false);
      if (response && apiErrors.includes(response.error!)) {
        handleShowMessage(response.message!);
        return;
      }
      handleShowMessage("Erro ao se registrar");
      return;
    }

    update({ username: response.username, icon: response.icon });
    router.push("/");
    setTryingToRegister(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tryingToRegister) return;
    setTryingToRegister(true);

    const formData = new FormData(registerForm.current || e.currentTarget);

    const username = formData.get("username")?.valueOf() as string;
    const email = formData.get("email")?.valueOf() as string;
    const password = formData.get("password")?.valueOf() as string;
    const confirmPassword = formData.get("confirm_password")?.valueOf() as string;
    const acceptedTerms = formData.get("accepted_terms")?.valueOf() as string | undefined | null;

    if (password !== confirmPassword) {
      setTryingToRegister(false);
      handleShowMessage("É necessário que a senha e a senha de confirmação sejam iguais.");
      return;
    } else if (!acceptedTerms) {
      setTryingToRegister(false);
      handleShowMessage("Você precisa aceitar os termos se quiser fazer parte do Gamix!");
      return;
    }

    register({
      username,
      email,
      password
    });
  };
  
  return (
    <form className={signupFormStyles.form} onSubmit={onSubmit} ref={registerForm}>
      <div className={signupFormStyles.fields}>
        <Input
          icon="user"
          label="Username"
          name="username"
          placeholder="Digite um nome de usuário válido"
          type="text"
        />
        <Input
          icon="user"
          label="E-mail"
          name="email"
          placeholder="Digite seu e-mail"
          type="email"
        />
        <Input
          icon="lock"
          label="Senha"
          name="password"
          placeholder="Digite uma senha"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPasswordState(e.target.value)
          }
          onFocus={() => collapsableRef.current?.collapse()}
          onBlur={() => collapsableRef.current?.uncollapse()}
          type="password"
        />
        <Collapsable
          ref={collapsableRef}
          items={[
            {
              icon: hasOneUppercaseChar(passwordState) ? "check" : "x",
              text: "Contém pelo menos um caractere maiúsculo",
            },
            {
              icon: hasNumber(passwordState) ? "check" : "x",
              text: "Contém pelo menos um número",
            },
            {
              icon: hasSpecialChar(passwordState) ? "check" : "x",
              text: "Contem pelo menos um caractere especial",
            },
            {
              icon: hasEightOrMoreChars(passwordState) ? "check" : "x",
              text: "Contém no mínimo 8 caracteres",
            },
          ]}
        />
        <Input
          icon="lock"
          label="Confirme sua senha"
          name="confirm_password"
          placeholder="Digite sua senha novamente"
          type="password"
        />
      </div>

      <div className={signupFormStyles.accept}>
        <Checkbox defaultChecked={false} name="accepted_terms" />
        <Text size="xs" fixeSize asChild>
          <Link href={"/terms"}>
            Eu li e concordo com os{" "}
            <span>termos e políticas de privacidade</span>
          </Link>
        </Text>
      </div>

      <Button
        style={{
          width: "100%",
          marginTop: "1rem",
          marginBottom: "0.1rem",
        }}
        type="submit"
      >
        Registrar-se
      </Button>
    </form>
  );
};
