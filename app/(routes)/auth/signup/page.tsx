import { RegisterForm } from "./_components/SignupForm";
import registerStyles from "./signup.module.css";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function SignUp() {
  return (
    <main className={registerStyles.wrapper}>
      <div className={registerStyles.container}>
        <div className={registerStyles.logoWrap}>
          <Image
            src={"/logo.svg"}
            width={150}
            height={150}
            alt="Gamix logo image"
          />

          <h1>Criar uma conta</h1>
        </div>

        <RegisterForm />

        <p className={registerStyles.haveAccount}>
          <Link href="/auth/signin">Já tem uma conta?</Link>
        </p>
      </div>
    </main>
  );
}
