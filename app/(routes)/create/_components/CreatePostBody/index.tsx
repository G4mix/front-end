import { TextArea } from "@components/TextArea";
import { Icon } from "@components/Icon";
import styles from "./CreatePostBody.module.css";
import React from "react";

export const CreatePostBody = () => {
  return (
    <div className={styles.postBody}>
      <TextArea rows={1} className={styles.postContent} name="post_content" placeholder="Conteúdo da postagem" maxLength={700} />
      <div className={styles.postCommands}>
        <Icon icon="image" className={styles.postCommandIcon} />
        <Icon icon="pen-to-square" className={styles.postCommandIcon} disabled />
        <Icon icon="chart" className={styles.postCommandIcon} disabled />
        <Icon icon="link" className={styles.postCommandIcon} />
        <Icon icon="code" className={styles.postCommandIcon} disabled />
      </div>
    </div>
  );
};