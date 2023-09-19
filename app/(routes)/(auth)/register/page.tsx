import React from "react";
import Image from "next/image";

import registerStyles from "./register.module.css";
import { RegisterForm } from "@/app/_components/RegisterForm";
import Link from "next/link";

export default function Register() {
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
          <Link href="/login">Já tem uma conta?</Link>
        </p>
      </div>
    </main>
  );
}
