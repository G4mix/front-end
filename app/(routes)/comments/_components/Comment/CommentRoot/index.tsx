import React, { ReactNode } from "react";
import styles from "./CommentRoot.module.css";

type CommentRootProps = {
  children: ReactNode;
  marked: boolean;
  isReply?: boolean;
}

export const CommentRoot = ({ children, marked, isReply=false }: CommentRootProps) => {
  return (
    <div className={`${styles.root} ${isReply ? styles.isReply : ""}`}>
      <div className={`${styles.rootChildren} ${marked ? styles.marked : ""}`}>
        {children}
      </div>
    </div>
  );
};