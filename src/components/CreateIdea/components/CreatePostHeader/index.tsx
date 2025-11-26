import styles from "../../style.module.css";

interface IProps {
  submitForm: () => void;
}

export const Header = ({ submitForm }: IProps) => {
  return (
    <header className={styles.header}>
      <h2>Nova postagem</h2>

      <button onClick={submitForm}>Publicar</button>
    </header>
  );
};
