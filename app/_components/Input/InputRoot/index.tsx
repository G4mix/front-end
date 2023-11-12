import styles from "./InputRoot.module.css";
import React from "react";

interface InputRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const InputRoot = ({ children, ...props }: InputRootProps) => {
  return (
    <div {...props} className={styles.root}>{children}</div>
  );
}