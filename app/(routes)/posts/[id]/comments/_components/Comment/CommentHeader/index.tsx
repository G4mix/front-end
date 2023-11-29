import type { CommentType } from "@classes/APIManager/base/types/Models.types";
import { DuotoneUserIcon } from "@components/DuotoneUserIcon";
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
        href={`/users/${author!.user!.username}`}
        aria-label={`Perfil do usuário ${author!.displayName || author!.user!.username}`}
      >
        <div className={styles.userZone}>
          {
            author!.user!.icon ?
              <Image
                src={author!.user!.icon }
                alt={`Imagem do usuário ${author!.displayName || author!.user!.username}`}
                className={styles.userIcon}
                width={16}
                height={16}
              />
              :
              <DuotoneUserIcon.Root className={styles.duotoneUserIcon}>
                <DuotoneUserIcon.Circle className={styles.circleIcon} />
                <DuotoneUserIcon.UserCircle className={styles.userCircleIcon} />
              </DuotoneUserIcon.Root>
          }
          <Text size="xs" weight="medium">{author!.displayName! || author!.user!.username}</Text>
          <Text size="xs" className={styles.date}>· {updatedAt ? `Atualizado ${formatDate(new Date(updatedAt!))}` : formatDate(new Date(createdAt!))}</Text>
        </div>
      </Link>
      <Icon icon="ellipsis-h" className={styles.reportIcon} disabled />
    </div>
  );
};


