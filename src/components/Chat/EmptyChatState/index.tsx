import { BsFillChatDotsFill } from "react-icons/bs";
import styles from "./styles.module.css";

export const EmptyChatState = () => {
  return (
    <div className={styles.emptyState}>
      <BsFillChatDotsFill className={styles.icon} />
      <h3>Comece a Conversar!</h3>
      <p>
        Este é o seu espaço para se conectar e<br />
        compartilhar ideias com pessoas da mesma área.
      </p>
    </div>
  );
};

