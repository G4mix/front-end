"use client";

import type { CommentType } from "@/app/_classes/APIManager/base/types/Models.types";
import { formatNumberWithSuffix } from "@functions/formatNumberWithSuffix";
import { useSession } from "@contexts/global/SessionContext";
import { useRouter } from "next/navigation";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import React, { useState } from "react";
import styles from "./CommentCommands.module.css";

type CommentCommandsProps = {
  handleWantToRespond: () => void;
} & Pick<CommentType, "likesCount">;

export const CommentCommands = ({ likesCount, handleWantToRespond }: CommentCommandsProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  const handleLikeClick = () => {
    if (status === "unauthenticated") return router.push("/auth/signin");
    setIsLiked(!isLiked);
  };

  return (
    <div className={styles.commands}>
      <div className={styles.likeZone} onClick={handleLikeClick}>
        <Icon icon={isLiked ? "liked" : "like"} className={styles.likeIcon} />
        <Text size="xs">{formatNumberWithSuffix(likesCount || 0)}</Text>
      </div>
      <Text size="xs" weight="bold" onClick={handleWantToRespond} className={styles.replyComment}>Responder</Text>
    </div>
  );
};