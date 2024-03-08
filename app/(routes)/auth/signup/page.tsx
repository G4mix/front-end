import { RegisterForm } from "@components/Forms/SignupForm";
import { Text } from "@components/Text";
import registerStyles from "./signup.module.css";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function SignUpPage() {
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

        <Text size="md" asChild><h2>Criar uma conta</h2></Text>
      </div>

      <RegisterForm />

      <Text size="xxs" align="center" weight="thin" className={registerStyles.haveAccount} asChild>
        <Link href="/auth/signin">Já tem uma conta?</Link>
      </Text>
    </main>
  );
}
