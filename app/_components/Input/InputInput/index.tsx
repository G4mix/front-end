import styles from "./InputInput.module.css";
import React, { ChangeEvent } from "react";

interface InputInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: "text" | "password" | "email";
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function InputInput({
  name,
  type,
  onChange,
  value,
  placeholder,
  ...props
}: InputInputProps) {
  return (
    <input
      {...props}
      type={type}
      className={styles.input}
      autoComplete="off"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}
