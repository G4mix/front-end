import styles from "./InputField.module.css";
import React from "react";

type InputFieldProps = {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const InputField = ({ children, className=undefined, ...props }: InputFieldProps) => {
  return (
    <div {...props} className={`${className || styles.field}`}>{children}</div>
  );
};