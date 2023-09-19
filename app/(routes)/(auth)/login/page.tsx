import React from "react";
import Image from "next/image";

import loginStyles from "./login.module.css";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";

import Link from "next/link";

export default function Login() {
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

        <div className={loginStyles.form}>
          <div className={loginStyles.fields}>
            <Input
              icon="user"
              label="Username"
              name="username"
              placeholder="Digite um nome de usuário válido"
              type="text"
            />
            <Input
              icon="lock"
              label="Senha"
              name="password"
              placeholder="Digite uma senha"
              type="password"
            />
          </div>

          <p>
            <Link href="">Esqueceu sua senha?</Link>{" "}
          </p>
        </div>

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
          <div className={loginStyles.rememberMe}>
            <Checkbox />
            <p>Lembrar de mim por 30 dias</p>
          </div>
          <Button>Conectar-se</Button>
        </div>
        <p className={loginStyles.createAccount}>
          <Link href="/register">Ainda não tem uma conta?</Link>
        </p>
      </div>
    </main>
  );
}
