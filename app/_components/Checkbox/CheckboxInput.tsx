import { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function CheckboxInput({ ...props }: CheckboxInputProps) {
  return <input type="checkbox" className={styles.input} {...props} />;
}