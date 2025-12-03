import styles from "../../style.module.css";

interface IProps {
  submitForm: () => void;
  isFormValid: boolean;
}

export const Header = ({ submitForm, isFormValid }: IProps) => {
  return (
    <header className={styles.header}>
      <h2>Nova ideia</h2>

      <button onClick={submitForm} disabled={!isFormValid}>Publicar</button>
    </header>
  );
};
