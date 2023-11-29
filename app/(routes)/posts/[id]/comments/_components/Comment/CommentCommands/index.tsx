"use client";

import type { CommentType } from "@classes/APIManager/base/types/Models.types";
import { formatNumberWithSuffix } from "@functions/formatNumberWithSuffix";
import { LikeMutationManager } from "@classes/APIManager/like/LikeMutationManager";
import { useMessagesContext } from "@contexts/global/MessagesContext";
import { useSession } from "@contexts/global/SessionContext";
import { apiErrors } from "@constants/apiErrors";
import { useRouter } from "next/navigation";
import { debounce } from "@functions/debounce";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import React, { useCallback, useState } from "react";
import styles from "./CommentCommands.module.css";

type CommentCommandsProps = {
  handleWantToRespond: () => void;
  comment: CommentType;
};

export const CommentCommands = ({ comment, handleWantToRespond }: CommentCommandsProps) => {
  const [isLiked, setIsLiked] = useState(comment!.isLiked! || false);
  const { handleShowMessage } = useMessagesContext();
  const { status } = useSession();
  const router = useRouter();

  const sendLike = useCallback(async (commentId: number, isLikedComment: boolean) => {
    const like = await LikeMutationManager.likeComment(commentId, isLikedComment);
    if (like && like.error) {
      if (apiErrors.includes(like.error)) handleShowMessage(like!.message!);
      handleShowMessage(`Erro ao executar um ${isLikedComment ? "deslike" : "like"}`);
    }
  }, []);
  const debouncedSendLike = useCallback(debounce(sendLike as (...args: unknown[]) => unknown, 3000), []);

  const handleLikeClick = async () => {
    if (status === "unauthenticated") router.push("/auth/signin");
    isLiked ? comment!.likesCount!-- : comment!.likesCount!++;
    debouncedSendLike(comment!.id!, !isLiked);
    setIsLiked(!isLiked);
  };

  return (
    <div className={styles.commands}>
      <div className={styles.likeZone} onClick={handleLikeClick}>
        <Icon icon={isLiked ? "liked" : "like"} className={styles.likeIcon} />
        <Text size="xs">{formatNumberWithSuffix(comment!.likesCount!)}</Text>
      </div>
      <Text size="xs" weight="bold" onClick={handleWantToRespond} className={styles.replyComment}>Responder</Text>
    </div>
  );
};