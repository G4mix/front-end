import { Text } from "@components/Text";
import React, { ReactNode } from "react";
import styles from "./CommentMain.module.css";

type CommentMainProps = {
  children: ReactNode;
}

export function CommentMain({ children }: CommentMainProps) {
  return (
    <div className={styles.main}>
      <Text size="sm" weight="light" align="justify">{children}</Text>
    </div>
  );
}