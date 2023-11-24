import { PostType } from "@/app/_classes/APIManager/base/types/Models.types";
import { Text } from "@components/Text";
import styles from "./PostMain.module.css";
import React from "react";

type PostMainProps = Pick<PostType, "content" | "title">;

export const PostMain = ({ title="", content="" }: PostMainProps) => {
  return (
    <div className={styles.postMain}>
      <Text size="default" weight="bold">{title}</Text>
      <Text size="xs" weight="light" align="justify">{content}</Text>
    </div>
  );
};