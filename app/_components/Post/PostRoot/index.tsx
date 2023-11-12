import React, { ReactNode } from "react";
import styles from "./PostRoot.module.css";

type PostRootProps = {
  children: ReactNode;
};

export const PostRoot = ({ children }: PostRootProps) => {
  return (
    <div className={styles.postRoot}>
      {children}
    </div>
  );
}