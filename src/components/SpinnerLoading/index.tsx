import styles from "./style.module.css";

export const SpinnerLoading = () => {
  return (
    <div className={styles.dotLoadingContainer}>
      <div className={styles.dotLoading}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};
