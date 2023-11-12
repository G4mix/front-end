import styles from "./InputInput.module.css";
import React, { ChangeEvent } from "react";

interface InputInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: "text" | "password" | "email";
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputInput = ({
  name, type,
  onChange, value,
  placeholder, className,
  ...props
}: InputInputProps) => {
  return (
    <input
      {...props}
      type={type}
      className={`${styles.input} ${className ? className : ""}`}
      autoComplete="off"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}
