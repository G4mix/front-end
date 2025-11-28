import Image from "next/image";
import styles from "./styles.module.css";

export const ChatPresentation = () => {
  return (
    <div className={styles.presentation}>
      <div className={styles.header}>
        <Image src="/icons/chat_smile.svg" alt="Chat" width={37} height={34} />
        <h3>Comece a conversar!</h3>
      </div>

      <p>Este é o seu espaço para se conectar com os usuários.</p>
    </div>
  );
};
