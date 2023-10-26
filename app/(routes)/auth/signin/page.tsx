import { LoginForm } from "./_components/SigninForm";
import { Heading } from "@components/Heading";
import { Text } from "@components/Text";
import { Icon } from "@components/Icon";
import loginStyles from "./signin.module.css";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className={loginStyles.wrapper}>
      <div className={loginStyles.logoWrap}>
        <Image
          src={"/logo.svg"}
          width={150}
          height={150}
          alt="Gamix logo image"
        />

        <Heading size="md">Acesse sua conta</Heading>
      </div>

      <LoginForm>
        <div className={loginStyles.loginOptions}>
          <Heading size="xs">Você também pode entrar com:</Heading>
          <ul>
            <li>
              <Icon icon="google" size="2xl" disabled />
            </li>
            <li>
              <Icon icon="linkedin" size="2xl" disabled />
            </li>
            <li>
              <Icon icon="github" size="2xl" disabled />
            </li>
          </ul>
        </div>
      </LoginForm>
      <Text size="xxs" align="center" weight="thin" className={loginStyles.createAccount} asChild>
        <Link href="/auth/signup">Ainda não tem uma conta?</Link>
      </Text>
    </main>
  );
}
