import styles from "./InputInput.module.css";
import React from "react";

interface InputInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: "text" | "password" | "email";
  name: "username" | "password" | "email";
}

export function InputInput({ type, placeholder, ...props }: InputInputProps) {
  return (
    <input 
      {...props}
      type={type} className={styles.input} 
      autoComplete="off" placeholder={placeholder} 
    />
  );
}