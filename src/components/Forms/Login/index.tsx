"use client";

import Link from "next/link";

import { FaLock } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { emailRegex } from "@/utils/email";
import { useState } from "react";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { useAuth } from "@/hooks/useAuth";
import { ILogin } from "@/interfaces/auth";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { signin: login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();

  const onSubmit = async (body: ILogin) => {
    setIsLoading(true);

    await login(body);

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="field">
        <label className="label" htmlFor="email">
          E-mail
        </label>

        <div className="inputBox">
          <FiMail className="inputIcon" />
          <input
            id="email"
            type="text"
            className={`input ${errors.email && "error"}`}
            placeholder="Digite o seu e-mail"
            {...register("email", {
              required: { value: true, message: "Este campo é obrigatório!" },
              pattern: {
                value: emailRegex,
                message: "Insira um email valído!",
              },
            })}
          />
        </div>
        {errors.email && (
          <span className="errorMessage">{errors.email.message}</span>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="password">
          Senha
        </label>

        <div className="inputBox">
          <FaLock className="inputIcon" />
          <input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            className={`input ${errors.password && "error"}`}
            {...register("password", {
              required: { value: true, message: "Este campo é obrigatório!" },
            })}
          />
        </div>
        {errors.password && (
          <span className="errorMessage">{errors.password.message}</span>
        )}
      </div>

      {/* 
      Desabilitado por enquanto, pois a tela não está integrada
      
      <Link href={"/auth/forgot-password"} className="forgotLink">
        Esqueci minha senha
      </Link>
      */}

      <button type="submit" className="submitButton">
        {isLoading ? <SpinnerLoading /> : "Entrar"}
      </button>

      <p className="actionLink">
        Ainda não tem uma conta?{" "}
        <Link href={"/auth/register"}>Criar conta</Link>
      </p>
    </form>
  );
};
