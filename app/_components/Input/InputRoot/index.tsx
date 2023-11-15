import styles from "./InputRoot.module.css";
import React from "react";

type InputRootProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const InputRoot = ({ children, ...props }: InputRootProps) => {
  return (
    <div {...props} className={styles.root}>{children}</div>
  );
};