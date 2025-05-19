"use client";

import Link from "next/link";
import { useEffect, useReducer, useState } from "react";
import { FaCheck, FaLock, FaXmark } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import {
  PasswordValidationState,
  validationsReducer,
} from "./validationsReducer";

const initialValidationsState: PasswordValidationState = {
  hasPassword: false,
  hasSixChar: false,
  hasNumber: false,
  hasSpecialChar: false,
  hasUppercaseChar: false,
};

export const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isValidationBoxVisible, setIsValidationBoxVisible] = useState(false);

  const [
    { hasNumber, hasSixChar, hasSpecialChar, hasUppercaseChar, hasPassword },
    dispatch,
  ] = useReducer(validationsReducer, initialValidationsState);

  useEffect(() => {
    dispatch({ type: "VALIDATE", payload: password });
  }, [password]);

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
    <form action="" className="form">
      <div className="field">
        <label className="label" htmlFor="username">
          Nome de Usuario
        </label>

        <div className="inputBox">
          <FiMail className="inputIcon" />
          <input
            name="username"
            id="username"
            type="text"
            placeholder="Digite o seu e-mail"
            className="input"
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="email">
          E-mail
        </label>

        <div className="inputBox">
          <FiMail className="inputIcon" />
          <input
            name="email"
            id="email"
            type="text"
            placeholder="Digite o seu e-mail"
            className="input"
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="password">
          Senha
        </label>

        <div className="inputBox">
          <FaLock className="inputIcon" />
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onFocus={() => setIsValidationBoxVisible(true)}
            onBlur={() => !hasPassword && setIsValidationBoxVisible(false)}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Digite sua senha"
            className="input"
          />
        </div>
      </div>

      {
        isValidationBoxVisible && <div className="passwordValidation">
        <p>A senha deve conter no mínimo:</p>

        <div className="validityItems">
          <span
            className={`validityItem ${hasSixChar && hasPassword && "valid"} ${
              !hasSixChar && hasPassword && "nonValid"
            }`}
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
      }

      <div className="field">
        <label className="label" htmlFor="confirm_password">
          Confirme a senha
        </label>

        <div className="inputBox">
          <FaLock className="inputIcon" />
          <input
            type="text"
            value={confirmPassword}
            id="confirm_password"
            name="confirm_password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Digite sua senha"
            className="input"
          />
        </div>
      </div>

      <label htmlFor="terms" className="termsAgreement">
        <input type="checkbox" id="terms" name="terms" />
        <span className="checkmark" />
        <span>
          Eu li e concordo com os{" "}
          <Link href={"/auth/forgot-password"}>
            termos e politicas de privacidade
          </Link>
        </span>
      </label>

      <button type="submit" className="submitButton">
        Criar Conta
      </button>

      <p className="actionLink">
        Já tem uma conta? <Link href={"/auth/login"}>Entrar</Link>
      </p>
    </form>
  );
};
