"use client";

import React, { type ChangeEvent } from "react";
import styles from "./InputInput.module.css";

type InputInputProps = {
  placeholder: string;
  type: "text" | "password" | "email";
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  className?: React.InputHTMLAttributes<HTMLInputElement>["className"];
} & React.InputHTMLAttributes<HTMLInputElement>;

export const InputInput = ({
  name, type, onChange, value, placeholder, className, defaultValue, ...inputProps
}: InputInputProps) => {
  return (
    <input
      {...inputProps}
      defaultValue={defaultValue ? defaultValue : undefined}
      type={type}
      className={`${className || styles.input}`}
      autoComplete="off"
      placeholder={placeholder}
      name={name}
      value={value ? value : undefined}
      onChange={onChange}
    />
  );
};