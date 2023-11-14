import { DuotoneUserIcon } from "@components/DuotoneUserIcon";
import { CommentType } from "@classes/APIManager/types/Models.types";
import { formatDate } from "@functions/formatDate";
import { Heading } from "@components/Heading";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import styles from "./PostHeader.module.css";
import React from "react";

type PostHeaderProps = Pick<CommentType, "createdAt" | "updatedAt" | "author">;

export const PostHeader = ({ author, createdAt, updatedAt }: PostHeaderProps) => {
  return(
    <div className={styles.postHeader}>
      <div className={styles.postUser}>
        {
          author!.user!.icon ?
            <img
              src={author!.user!.icon }
              alt={`Imagem do usuário ${author!.displayName || author!.user!.username}`}
              className={styles.userIcon}
            />
          : <DuotoneUserIcon />
        }
        <Heading size="sm" asChild>
          <h5>{author!.displayName || author!.user!.username}</h5>
        </Heading>
        <Text size="xs" weight="thin">· {updatedAt ? `Atualizado ${formatDate(updatedAt!)}` : formatDate(createdAt!)}</Text>
      </div>
      <Icon icon="ellipsis-h" width={16} height={16} disabled />
    </div>
  );
};