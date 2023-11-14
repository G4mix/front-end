import { DuotoneUserIcon } from "@components/DuotoneUserIcon";
import { CommentType } from "@classes/APIManager/types/Models.types";
import { formatDate } from "@functions/formatDate";
import { Heading } from "@components/Heading";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import styles from "./PostHeader.module.css";
import Image from "next/image";
import React from "react";
import Link from "next/link";

type PostHeaderProps = Pick<CommentType, "createdAt" | "updatedAt" | "author">;

export const PostHeader = ({ author, createdAt, updatedAt }: PostHeaderProps) => {
  return(
    <div className={styles.postHeader}>
      <Link
        href={`/${author!.user!.username}`}
        aria-label={`Perfil do usuário ${author!.displayName || author!.user!.username}`}
        className={styles.postUser}
      >
        {
          author!.user!.icon ?
            <Image
              src={author!.user!.icon }
              alt={`Imagem do usuário ${author!.displayName || author!.user!.username}`}
              className={styles.userIcon}
              width={24}
              height={24}
            />
            : <DuotoneUserIcon />
        }
        <Heading size="sm" asChild>
          <h5>{author!.displayName || author!.user!.username}</h5>
        </Heading>
        <Text size="xs" weight="thin">· {updatedAt ? `Atualizado ${formatDate(updatedAt!)}` : formatDate(createdAt!)}</Text>
      </Link>
      <Icon icon="ellipsis-h" width={16} height={16} disabled />
    </div>
  );
};