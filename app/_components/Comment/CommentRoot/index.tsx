import React, { ReactNode } from "react";
import styles from "./CommentRoot.module.css";

type CommentRootProps = {
  children: ReactNode;
  isReply?: boolean;
}

export function CommentRoot({ children, isReply=false }: CommentRootProps) {
  return (
    <div className={`${styles.root} ${isReply ? styles.isReply : ""}`}>
      {children}
    </div>
  );
}