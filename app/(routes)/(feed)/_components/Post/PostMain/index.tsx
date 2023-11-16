import { Text } from "@components/Text";
import styles from "./PostMain.module.css";
import React from "react";

type PostMainProps = {
  content: string | null;
  title: string | null;
};

export const PostMain = ({ title, content }: PostMainProps) => {
  return (
    <div className={styles.postMain}>
      <Text size="default" weight="bold">{title}</Text>
      <Text size="xs" weight="light" align="justify">{content}</Text>
    </div>
  );
};