import { Icon } from "@components/Icon";
import styles from "./CommentHeader.module.css";
import React from "react";
import { Text } from "@components/Text";

export function CommentHeader() {
  return (
    <div className={styles.header}>
      <Icon icon="user-circle" size="2x" style={{color: "var(--jet)"}} />
      <Text size="xs" weight="medium">displayName</Text>
      <Text size="xs" weight="thin">· 15 out. 23</Text>
    </div>
  );
}


