import styles from "./Checkbox.module.css";
import React from "react";

interface CheckboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function CheckboxInput({ ...props }: CheckboxInputProps) {
  return <input type="checkbox" className={styles.input} {...props} />;
}