"use client";

import { formatNumberWithSuffix } from "@functions/formatNumberWithSuffix";
import { useMessagesContext } from "@contexts/global/MessagesContext";
import { useSession } from "@contexts/global/SessionContext";
import { useRouter } from "next/navigation";
import { PostType } from "@classes/APIManager/base/types/Models.types";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import React, { useState, useCallback } from "react";
import styles from "./PostCommands.module.css";
import Link from "next/link";

type PostCommandsProps = { post: PostType };

export const PostCommands = ({ post }: PostCommandsProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { handleShowMessage } = useMessagesContext();
  const { status } = useSession();
  const router = useRouter();
  
  const handleLikeClick = () => {
    if (status === "unauthenticated") router.push("/auth/signin");
    !isLiked ? post.likesCount!++ : post.likesCount!--;
    setIsLiked(prevValue => !prevValue);
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