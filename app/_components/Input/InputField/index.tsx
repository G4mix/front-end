import styles from "./InputField.module.css";
import React from "react";

interface InputFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function InputField({ children, ...props }: InputFieldProps) {
  return (
    <div {...props} className={styles.field}>{children}</div>
  );
}