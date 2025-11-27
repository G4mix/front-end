import styles from "./style.module.css";

export const SpinnerLoading = ({ isPrimary = false }: { isPrimary?: boolean }) => {
  return (
    <div className={styles.dotLoadingContainer}>
      <div className={styles.dotLoading}>
        <span className={isPrimary ? styles.primary : ""}></span>
        <span className={isPrimary ? styles.primary : ""}></span>
        <span className={isPrimary ? styles.primary : ""}></span>
      </div>
    </div>
  );
};
