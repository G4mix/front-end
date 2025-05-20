import styles from "../../style.module.css";

export const CreatePostHeader = () => {
  return (
    <header className={styles.header}>
      <h2>Nova postagem</h2>

      <button>Publicar</button>
    </header>
  );
};
