import { RegisterForm } from "./_components/SignupForm";
import registerStyles from "./signup.module.css";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Heading } from "@/app/_components/Heading";
import { Text } from "@/app/_components/Text";

export default function SignUp() {
  return (
    <main className={registerStyles.wrapper}>
      <div className={registerStyles.logoWrap}>
        <Image
          src={"/logo.svg"}
          width={150}
          height={150}
          alt="Gamix logo image"
        />

        <Heading size="md">Criar uma conta</Heading>
      </div>

      <RegisterForm />

      <Text size="xxs" align="center" weight="thin" className={registerStyles.haveAccount} asChild>
        <Link href="/auth/signin">Já tem uma conta?</Link>
      </Text>
    </main>
  );
}
