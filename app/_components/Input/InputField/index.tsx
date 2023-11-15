import styles from "./InputField.module.css";
import React from "react";

type InputFieldProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const InputField = ({ children, ...props }: InputFieldProps) => {
  return (
    <div {...props} className={styles.field}>{children}</div>
  );
};