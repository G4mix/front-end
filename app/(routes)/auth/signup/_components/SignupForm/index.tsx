"use client";

import Link from "next/link";

import signupFormStyles from "./signupForm.module.css";
import textStyles from "@components/Text/Text.module.css";

import React, { ChangeEvent, useState, useRef, useCallback } from "react";
import {
  hasEightOrMoreChars, hasGmailDomain, hasNumber,
  hasOneUppercaseChar, hasSpecialChar, isValidUsername
} from "@functions/formValidations";
import { Collapsable, CollapsableHandlers } from "../Collapsable";
import { Toast, ToastHandlers } from "@/app/_components/Toast";
import { APIManager } from "@classes/APIManager";
import { useRouter } from "next/navigation";
import { apiErrors } from "@constants/apiErrors";
import { Checkbox } from "@components/Checkbox";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { Text } from "@components/Text";

export const RegisterForm = () => {
  const collapsableRef = useRef<CollapsableHandlers>(null);
  const toastRef = useRef<ToastHandlers>(null);
  const registerForm = useRef<HTMLFormElement>(null);

  const [passwordState, setPasswordState] = useState("");
  const [tryingToRegister, setTryingToRegister] = useState(false);

  const router = useRouter();

  const register = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tryingToRegister) return;
    setTryingToRegister(true);

    const formData = new FormData(registerForm.current || e.currentTarget);

    const username = formData.get("username")?.valueOf() as string;
    const email = formData.get("email")?.valueOf() as string;
    const password = formData.get("password")?.valueOf() as string;
    const confirmPassword = formData.get("confirm_password")?.valueOf() as string;
    const acceptedTerms = formData.get("accepted_terms")?.valueOf() as string;

    if (!isValidUsername(username)) {
      toastRef.current?.showMessage(apiErrors["USERNAME_INVALID_FORMAT"]);
      return;
    } else if (username.length < 3) {
      toastRef.current?.showMessage(apiErrors["USERNAME_TOO_SHORT"]);
      return;
    } else if (!hasGmailDomain(email)) {
      toastRef.current?.showMessage(apiErrors["EMAIL_INVALID_FORMAT"]);
      return;
    } else if(!hasEightOrMoreChars(password)) {
      toastRef.current?.showMessage(apiErrors["PASSWORD_TOO_SHORT"]);
      return;
    } else if (!hasNumber(password)) {
      toastRef.current?.showMessage(apiErrors["PASSWORD_MISSING_NUMBER"]);
      return;
    } else if (!hasSpecialChar(password)) {
      toastRef.current?.showMessage(apiErrors["PASSWORD_MISSING_SPECIAL_CHAR"]);
      return;
    } else if (!hasOneUppercaseChar(password)) {
      toastRef.current?.showMessage(apiErrors["PASSWORD_MISSING_UPPERCASE"]);
      return;
    } else if (password !== confirmPassword) {
      toastRef.current?.showMessage("É necessário que a senha e a senha de confirmação sejam iguais.");
      return;
    } else if (!acceptedTerms) {
      toastRef.current?.showMessage("Você precisa aceitar os termos se quiser fazer parte do Gamix!");
      return;
    }

    const result = await APIManager.signUp({ username, email, password });
    if (apiErrors[result!]) {
      setTryingToRegister(false);
      toastRef.current?.showMessage(apiErrors[result!]);
      return;
    }

    router.push("/");
  }, []);

  return (
    <form className={signupFormStyles.form} onSubmit={(e) => register(e)} ref={registerForm}>
      <Toast ref={toastRef} />
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

      <div className={signupFormStyles.rememberMe}>
        <Checkbox defaultChecked={false} name="accepted_terms" />
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
      >
        Registrar-se
      </Button>
    </form>
  );
};
