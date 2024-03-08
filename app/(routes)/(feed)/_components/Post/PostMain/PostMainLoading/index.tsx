import { Text } from "@components/Text";
import localStyles from "./PostMainLoading.module.css";
import styles from "../PostMain.module.css";
import React from "react";

export const PostMainLoading = () => {
  return (
    <div className={styles.postMain}>
      <Text size="default" weight="bold" loading style={{width: "max-content"}}>Loading{".".repeat(18)}</Text>
      <div className={localStyles.lines}>
        <Text size="xs" weight="light" align="justify" loading>Loading{".".repeat(70)}</Text>
        <Text size="xs" weight="light" align="justify" loading>Loading{".".repeat(70)}</Text>
        <Text size="xs" weight="light" align="justify" loading style={{width: "max-content"}}>Loading{".".repeat(50)}</Text>
      </div>
    </div>
  );
};