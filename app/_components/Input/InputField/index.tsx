import styles from "./InputField.module.css";
import React from "react";

interface InputFieldProps {
  children: React.ReactNode;
}

export function InputField({ children }: InputFieldProps) {
  return (
    <div className={styles.field}>{children}</div>
  );
}