"use client";

import { formatNumberWithSuffix } from "@functions/formatNumberWithSuffix";
import { PostType } from "@classes/APIManager/types/Models.types";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import React, { useState } from "react";
import styles from "./PostCommands.module.css";

type PostCommandsProps = Pick<PostType, "likes" | "comments" | "views">;

export const PostCommands = ({ likes, comments, views }: PostCommandsProps) => {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <div className={styles.postCommands}>
      <div className={styles.postCommand} onClick={() => setIsLiked(!isLiked)}>
        <Icon icon={isLiked ? "liked" : "like"} size="lg" />
        <Text size="xs" weight="regular">{formatNumberWithSuffix(likes || 0)}</Text>
      </div>
      <div className={styles.postCommand}>
        <Icon icon="comments" size="lg" />
        <Text size="xs" weight="regular">{formatNumberWithSuffix(comments || 0)}</Text> 
      </div>
      <div className={styles.postCommand}>
        <Icon icon="chart" size="lg" />
        <Text size="xs" weight="regular">{formatNumberWithSuffix(views || 0)}</Text>
      </div>
      <Icon icon="share" size="lg" />
    </div>
  );
};