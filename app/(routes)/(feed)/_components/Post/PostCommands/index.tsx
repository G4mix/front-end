"use client";

import { formatNumberWithSuffix } from "@functions/formatNumberWithSuffix";
import { LikeMutationManager } from "@classes/APIManager/like/LikeMutationManager";
import { useMessagesContext } from "@contexts/global/MessagesContext";
import { useSession } from "@contexts/global/SessionContext";
import { useRouter } from "next/navigation";
import { apiErrors } from "@constants/apiErrors";
import { PostType } from "@classes/APIManager/base/types/Models.types";
import { debounce } from "@functions/debounce";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import React, { useState, useCallback } from "react";
import styles from "./PostCommands.module.css";
import Link from "next/link";

type PostCommandsProps = { post: PostType };

export const PostCommands = ({ post }: PostCommandsProps) => {
  const [isLiked, setIsLiked] = useState(post!.isLiked! || false);
  const { handleShowMessage } = useMessagesContext();
  const { status } = useSession();
  const router = useRouter();
  
  const sendLike = useCallback(async (postId: number, isLiked: boolean) => {
    const like = await LikeMutationManager.likePost(postId, isLiked);
    if (like && like.error) {
      if (apiErrors.includes(like.error)) handleShowMessage(like!.message!);
      handleShowMessage(`Erro ao executar um ${isLiked ? "deslike" : "like"}`);
    }
  }, []);
  const debouncedSendLike = useCallback(debounce(sendLike, 5000), []);

  const handleLikeClick = async () => {
    if (status === "unauthenticated") router.push("/auth/signin");
    isLiked ? post.likesCount!-- : post.likesCount!++;
    debouncedSendLike(post!.id!, !isLiked);
    setIsLiked(!isLiked);
  };

  const handleShareClick = useCallback(() => {
    const currentLocation = window.location.origin;

    if (navigator.share) {
      navigator
        .share({
          title: post.title || "Post do site Gamix!",
          text: post.content?.slice(0, 100) || "Venha fazer parte da plataforma que conecta desenvolvedores de games!",
          url: `${currentLocation}/posts/${post.id}`
        })
        .catch(() => handleShowMessage("Erro ao tentar compartilhar..."));
    } else {
      const textToCopy = `${currentLocation}/posts/${post.id}`;
      navigator.clipboard.writeText(textToCopy)
        .then(() => handleShowMessage("Link copiado para a área de transferência!", "smile"))
        .catch(() => handleShowMessage("Erro ao copiar para o clipboard..."));
    }
  }, []);

  return (
    <div className={styles.postCommands}>
      <div className={styles.postCommand} onClick={handleLikeClick}>
        <Icon icon={isLiked ? "liked" : "like"} size="lg" className={styles.postCommandIcon} />
        <Text size="xs" weight="regular">{formatNumberWithSuffix(post.likesCount!)}</Text>
      </div>
      <Link href={`/posts/${post.id!}/comments`} className={styles.postCommand}>
        <Icon icon="comments" size="lg" className={styles.postCommandIcon} />
        <Text size="xs" weight="regular">{formatNumberWithSuffix(post.commentsCount!)}</Text> 
      </Link>
      <div className={`${styles.postCommand} ${styles.postCommandView}`}>
        <Icon icon="chart" size="lg" className={styles.postCommandIcon} />
        <Text size="xs" weight="regular">{formatNumberWithSuffix(post.viewsCount!)}</Text>
      </div>
      <Icon icon="share" size="lg" className={styles.shareIcon} onClick={handleShareClick} />
    </div>
  );
};