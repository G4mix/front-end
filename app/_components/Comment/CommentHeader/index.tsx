import { DuotoneUserIcon } from "@components/Comment/DuotoneUserIcon";
import { Text } from "@components/Text";
import styles from "./CommentHeader.module.css";
import React from "react";

export function CommentHeader() {
  return (
    <div className={styles.header}>
      <DuotoneUserIcon />
      <Text size="xs" weight="medium">displayName</Text>
      <Text size="xs" className={styles.date}>· 15 out. 23</Text>
    </div>
  );
}


