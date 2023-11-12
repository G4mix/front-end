"use client";

import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import React, { useState } from "react";
import styles from "./PostCommands.module.css";

type PostCommandsProps = {
  like: string | null;
  comment: string | null;
  views: string | null;
};

export const PostCommands = ({ like, comment, views }: PostCommandsProps) => {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <div className={styles.postCommands}>
      <div className={styles.postCommand} onClick={() => setIsLiked(!isLiked)}>
        <Icon icon={isLiked ? "liked" : "like"} size="lg" />
        <Text size="xs" weight="regular">{like}</Text>
      </div>
      <div className={styles.postCommand}>
        <Icon icon="comments" size="lg" />
        <Text size="xs" weight="regular">{comment}</Text> 
      </div>
      <div className={styles.postCommand}>
        <Icon icon="chart" size="lg" />
        <Text size="xs" weight="regular">{views}</Text>
      </div>
      <Icon icon="share" size="lg" />
    </div>
  );
}