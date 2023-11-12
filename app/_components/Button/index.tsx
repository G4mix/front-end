import styles from "./Button.module.css";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};