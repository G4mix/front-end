import Link from "next/link";
import { FaLock } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

export const LoginForm = () => {
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

      <div className="field">
        <label className="label" htmlFor="password">
          Senha
        </label>

        <div className="inputBox">
          <FaLock className="inputIcon" />
          <input
            name="password"
            id="password"
            type="text"
            placeholder="Digite sua senha"
            className="input"
          />
        </div>
      </div>

      <Link href={"/auth/forgot-password"} className="forgotLink">
        Esqueci minha senha
      </Link>

      <button type="submit" className="submitButton">
        Entrar
      </button>

      <p className="actionLink">
        Ainda não tem uma conta?{" "}
        <Link href={"/auth/register"}>Criar conta</Link>
      </p>
    </form>
  );
};
