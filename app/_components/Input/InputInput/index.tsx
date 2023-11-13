import React, { type ChangeEvent, forwardRef } from "react";
import styles from "./InputInput.module.css";

interface InputInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type: "text" | "password" | "email";
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputInput = forwardRef<HTMLInputElement, InputInputProps>((props, ref) => {
  const {
    name, type, onChange, value, placeholder, className, ...inputProps
  } = props;
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
      ref={ref}
    />
  );
});

InputInput.displayName = "InputInput";

export { InputInput };