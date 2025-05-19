import Link from "next/link";
import { FaLock } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

export const ForgotPasswordForm = () => {
  return (
    <form action="" className="form">
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

      <button type="submit" className="submitButton">
        Redefinir senha
      </button>

      <p className="actionLink">
        Lembrou a sua senha? <Link href={"/auth/login"}>Entrar</Link>
      </p>
    </form>
  );
};
