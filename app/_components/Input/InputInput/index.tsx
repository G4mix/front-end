import styles from "./InputInput.module.css";
import React from "react";

interface InputInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "password" | "email";
}

export function InputInput({ type }: InputInputProps) {
  return (
    <input type={type} className={styles.input} />
  );
}