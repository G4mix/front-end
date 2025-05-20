"use client";

import Link from "next/link";
import { useEffect, useReducer, useState } from "react";
import { FaCheck, FaLock, FaXmark } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import {
  PasswordValidationState,
  validationsReducer,
} from "./validationsReducer";
import { IRegister } from "@/interfaces/auth";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { emailRegex } from "@/utils/email";
import { SpinnerLoading } from "@/components/SpinnerLoading";

const initialValidationsState: PasswordValidationState = {
  hasPassword: false,
  hasSixChar: false,
  hasNumber: false,
  hasSpecialChar: false,
  hasUppercaseChar: false,
};

export const RegisterForm = () => {
  const { signup } = useAuth();

  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister & { confirm_password?: string; terms?: boolean }>();

  const onSubmit = async (
    body: IRegister & { confirm_password?: string; terms?: boolean }
  ) => {
    setIsLoading(true);

    delete body.terms;
    delete body.confirm_password;
    await signup(body);

    setIsLoading(false);
  };

  const [isValidationBoxVisible, setIsValidationBoxVisible] = useState(false);

  const [
    { hasNumber, hasSixChar, hasSpecialChar, hasUppercaseChar, hasPassword },
    dispatch,
  ] = useReducer(validationsReducer, initialValidationsState);

  const renderValidationIcons = (isValid: boolean) => {
    return isValid ? (
      <FaCheck className="validityIcon" />
    ) : !isValid && hasPassword ? (
      <FaXmark className="validityIcon" />
    ) : (
      <></>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="field">
        <label className="label" htmlFor="username">
          Nome de Usuario
        </label>

        <div className="inputBox">
          <FiMail className="inputIcon" />
          <input
            type="text"
            id="username"
            className={`input ${errors.username && "error"}`}
            placeholder="Digite o seu e-mail"
            {...register("username", {
              required: { value: true, message: "Este campo é obrigatório!" },
            })}
          />
        </div>
        {errors.username && (
          <span className="errorMessage">{errors.username.message}</span>
        )}
      </div>

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
            className={`input ${errors.password && "error"}`}
            placeholder="Digite sua senha"
            onFocus={() => setIsValidationBoxVisible(true)}
            {...register("password", {
              required: { value: true, message: "Este campo é obrigatório!" },
              onChange: (e) => {
                const value = e.target.value;

                setPassword(value);

                dispatch({ type: "VALIDATE", payload: value });
              },
              onBlur: () => {
                if (!hasPassword) {
                  setIsValidationBoxVisible(false);
                }
              },
            })}
          />
        </div>
        {errors.password && (
          <span className="errorMessage">{errors.password.message}</span>
        )}
      </div>

      {isValidationBoxVisible && (
        <div className="passwordValidation">
          <p>A senha deve conter no mínimo:</p>

          <div className="validityItems">
            <span
              className={`validityItem ${
                hasSixChar && hasPassword && "valid"
              } ${!hasSixChar && hasPassword && "nonValid"}`}
            >
              {renderValidationIcons(hasSixChar)} 6 caracteres
            </span>
            <span
              className={`validityItem ${
                hasSpecialChar && hasPassword && "valid"
              } ${!hasSpecialChar && hasPassword && "nonValid"}`}
            >
              {renderValidationIcons(hasSpecialChar)} 1 caractere especial
            </span>
            <span
              className={`validityItem ${hasNumber && hasPassword && "valid"} ${
                !hasNumber && hasPassword && "nonValid"
              }`}
            >
              {renderValidationIcons(hasNumber)} 1 número
            </span>
            <span
              className={`validityItem ${
                hasUppercaseChar && hasPassword && "valid"
              } ${!hasUppercaseChar && hasPassword && "nonValid"}`}
            >
              {renderValidationIcons(hasUppercaseChar)} 1 caractere maiúsculo
            </span>
          </div>
        </div>
      )}

      <div className="field">
        <label className="label" htmlFor="confirm_password">
          Confirme a senha
        </label>

        <div className="inputBox">
          <FaLock className="inputIcon" />
          <input
            type="password"
            id="confirm_password"
            className={`input ${errors.confirm_password && "error"}`}
            placeholder="Digite sua senha"
            {...register("confirm_password", {
              required: { value: true, message: "Este campo é obrigatório!" },
              validate: (value) =>
                value === password || "As senhas não coincidem!",
            })}
          />
        </div>
        {errors.confirm_password && (
          <span className="errorMessage">
            {errors.confirm_password.message}
          </span>
        )}
      </div>

      <label htmlFor="terms" className="termsAgreement">
        <input
          type="checkbox"
          id="terms"
          {...register("terms", {
            validate: (value) => {
              return value === true || "Aceite para prosseguir";
            },
          })}
        />
        <span className={`checkmark ${errors.terms && "error"}`} />
        <span>
          Eu li e concordo com os{" "}
          <Link href={"/auth/forgot-password"}>
            termos e politicas de privacidade
          </Link>
        </span>
      </label>
      {errors.terms && (
        <span className="errorMessage">{errors.terms.message}</span>
      )}

      <button type="submit" className="submitButton">
        {isLoading ? <SpinnerLoading /> : "Criar Conta"}
      </button>

      <p className="actionLink">
        Já tem uma conta? <Link href={"/auth/login"}>Entrar</Link>
      </p>
    </form>
  );
};
