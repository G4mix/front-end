import { SelectImageCommand } from "./SelectImageCommand";
import { AddLinkCommand } from "./AddLinkCommand";
import { ContentImages } from "./ContentImages";
import { ContentLinks } from "./ContentLinks";
import { DropImages } from "./DropImages";
import { TextArea } from "@components/TextArea";
import { AddLink } from "./AddLink";
import { Icon } from "@components/Icon";
import styles from "./CreatePostBody.module.css";
import React from "react";

export const CreatePostBody = () => {
  return (
    <div className={styles.postBody}>
      <div className={styles.postContent}>
        <TextArea
          rows={1} className={styles.postContentArea}
          name="post_content" placeholder="Conteúdo da postagem"
          maxLength={700} autoResize
        />
        <DropImages />
        <ContentImages />
        <ContentLinks />
        <AddLink />
      </div>
      <div className={styles.postCommands}>
        <SelectImageCommand />
        <Icon icon="pen-to-square" className={styles.postCommandIcon} disabled />
        <Icon icon="chart" className={styles.postCommandIcon} disabled />
        <AddLinkCommand />
        <Icon icon="code" className={styles.postCommandIcon} disabled />
      </div>
    </div>
  );
};