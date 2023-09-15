import styles from "./InputRoot.module.css";
import React from "react";

interface InputRootProps {
  children: React.ReactNode;
}

export function InputRoot({ children }: InputRootProps) {
  return (
    <div className={styles.root}>{children}</div>
  );
}