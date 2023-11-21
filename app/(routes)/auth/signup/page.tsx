import { MessagesProvider } from "@contexts/MessagesContext";
import { RegisterForm } from "./_components/SignupForm";
import { Heading } from "@components/Heading";
import { Text } from "@components/Text";
import registerStyles from "./signup.module.css";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <MessagesProvider>
      <main className={registerStyles.wrapper}>
        <div className={registerStyles.logoWrap}>
          <Image
            src={"/logo.svg"}
            width={150}
            height={150}
            priority
            alt="Gamix logo image"
          />

          <Heading size="md">Criar uma conta</Heading>
        </div>

        <RegisterForm />

        <Text size="xxs" align="center" weight="thin" className={registerStyles.haveAccount} asChild>
          <Link href="/auth/signin">Já tem uma conta?</Link>
        </Text>
      </main>
    </MessagesProvider>
  );
}
