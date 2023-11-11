"use client";

import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import React, { useState } from "react";
import styles from "./CommentCommands.module.css";

type CommentCommandsProps = {
  likes: number;
}

export function CommentCommands({ likes }: CommentCommandsProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className={styles.commands}>
      <div className={styles.likeZone} onClick={() => setIsLiked(!isLiked)}>
        <Icon icon={isLiked ? "liked" : "like"} className={styles.likeIcon} />
        <Text size="xs">{likes}</Text>
      </div>
      <Text size="xs" weight="bold">Responder</Text>
    </div>
  );
}