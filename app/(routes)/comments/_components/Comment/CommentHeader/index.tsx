import type { CommentType } from "@classes/APIManager/types/Models.types";
import { DuotoneUserIcon } from "../DuotoneUserIcon";
import { formatDate } from "@functions/formatDate";
import { Text } from "@components/Text";
import { Icon } from "@components/Icon";
import styles from "./CommentHeader.module.css";
import Image from "next/image";
import React from "react";
import Link from "next/link";

type CommentHeaderProps = Pick<CommentType, "createdAt" | "updatedAt" | "author">;

export const CommentHeader = ({ author, createdAt, updatedAt }: CommentHeaderProps) => {
  return (
    <div className={styles.header}>
      <Link
        href={`/${author!.user!.username}`}
        aria-label={`Perfil do usuário ${author!.displayName || author!.user!.username}`}
        className={styles.userZone}
      >
        {
          author!.user!.icon ?
            <Image
              src={author!.user!.icon }
              alt={`Imagem do usuário ${author!.displayName || author!.user!.username}`}
              className={styles.userIcon}
            />
            : <DuotoneUserIcon />
        }
        <Text size="xs" weight="medium">{author!.displayName! || author!.user!.username}</Text>
        <Text size="xs" className={styles.date}>· {updatedAt ? `Atualizado ${formatDate(updatedAt!)}` : formatDate(createdAt!)}</Text>
      </Link>
      <Icon icon="ellipsis-h" className={styles.reportIcon} disabled />
    </div>
  );
};


