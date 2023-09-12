import { InputHTMLAttributes } from "react";
import { Icon } from "../Icon";
import styles from "./Checkbox.module.css";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Checkbox({ ...props }: CheckboxProps) {
  return (
    <label className={styles.root}>
      <input type="checkbox" className={styles.input} {...props} />
      <div className={styles.indicatorContainer}>
        <span className={styles.indicator}>
          <Icon icon="check" height={16} />
        </span>
      </div>
    </label>
  );
}
