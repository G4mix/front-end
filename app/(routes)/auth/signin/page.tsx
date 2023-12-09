import { LoginForm } from "./_components/SigninForm";
import { Heading } from "@components/Heading";
import { Text } from "@components/Text";
import { Icon } from "@components/Icon";
import registerStyles from "../signup/signup.module.css";
import loginStyles from "./signin.module.css";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <main className={registerStyles.wrapper}>
      <div className={registerStyles.logoWrap}>
        <Image
          src={"/logo.svg"}
          width={150}
          height={150}
          priority
          alt="Gamix logo image"
        />

        <Heading size="md">Acesse sua conta</Heading>
      </div>

      <LoginForm>
        <div className={loginStyles.loginOptions}>
          <Heading size="xs" asChild><h3>Você também pode entrar com:</h3></Heading>
          <div className={loginStyles.options}>
            <Icon icon="google" size="2xl" disabled />
            <Icon icon="linkedin" size="2xl" disabled />
            <Icon icon="github" size="2xl" disabled />
          </div>
        </div>
      </LoginForm>
      <Text size="xxs" align="center" weight="thin" className={registerStyles.redirectBelowButton} asChild>
        <Link href="/auth/signup">Ainda não tem uma conta?</Link>
      </Text>
    </main>
  );
}
