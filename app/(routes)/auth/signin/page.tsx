import { LoginForm } from "./_components/SigninForm";
import loginStyles from "./signin.module.css";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className={loginStyles.wrapper}>
      <div className={loginStyles.container}>
        <div className={loginStyles.logoWrap}>
          <Image
            src={"/logo.svg"}
            width={150}
            height={150}
            alt="Gamix logo image"
          />

          <h1>Acesse sua conta</h1>
        </div>

        <LoginForm>
          <div className={loginStyles.loginOptions}>
            <h3>Você também pode entrar com:</h3>
            <ul>
              <li>
                <button>
                  <img src="/icons/google.svg" alt="" />
                </button>
              </li>
              <li>
                <button>
                  <img src="/icons/linkedin.svg" alt="" />
                </button>
              </li>
              <li>
                <button>
                  {" "}
                  <img src="/icons/github.svg" alt="" />
                </button>
              </li>
            </ul>
          </div>
        </LoginForm>
        <p className={loginStyles.createAccount}>
          <Link href="/auth/signup">Ainda não tem uma conta?</Link>
        </p>
      </div>
    </main>
  );
}
