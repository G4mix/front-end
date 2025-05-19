import Image from "next/image";
import styles from "./style.module.css";

interface IAuthScreenLogo {
  screen: "login" | "register" | "forgot-password";
}

export const AuthScreenLogo = ({ screen }: IAuthScreenLogo) => {
  let logoText = "";

  switch (screen) {
    case "register":
      logoText = "Criar Conta";
      break;
    case "forgot-password":
      logoText = "Esqueci a Senha";
      break;
    default:
      logoText = "Entrar";
      break;
  }

  return (
    <div className={styles.logoWrapper}>
      <Image src={"/logo.png"} alt="Gamix" width={120} height={120} />

      <h1 className={styles.logoText}>{logoText}</h1>
    </div>
  );
};
