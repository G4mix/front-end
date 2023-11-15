import React, { type ChangeEvent } from "react";
import styles from "./InputInput.module.css";

type InputInputProps = {
  placeholder: string;
  type: "text" | "password" | "email";
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputInput = ({
  name, type, onChange, value, placeholder, className, ...inputProps
}: InputInputProps) => {
  return (
    <input
      {...inputProps}
      type={type}
      className={`${styles.input} ${className ? className : ""}`}
      autoComplete="off"
      placeholder={placeholder}
      name={name}
      value={value ? value : undefined}
      onChange={onChange}
    />
  );
};