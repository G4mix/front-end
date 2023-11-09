import { Text } from "@components/Text";
import styles from "./PostMain.module.css";
import React from "react";

type PostMainProps = {
  title: string | null;
  text: string | null;
};

export function PostMain({ title, text }: PostMainProps) {
  return (
    <div className={styles.postMain}>
      <Text size="default" weight="bold">{title}</Text>
      <Text size="xs" weight="light">{text}</Text>
    </div>
  );
}