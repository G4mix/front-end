import styles from "./Button.module.css";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
} &  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};