import type { CommentType, UserProfileType } from "@classes/APIManager/types/Models.types";
import { DuotoneUserIcon } from "../DuotoneUserIcon";
import { formatDate } from "@functions/formatDate";
import { Text } from "@components/Text";
import { Icon } from "@components/Icon";
import styles from "./CommentHeader.module.css";
import React from "react";

type CommentHeaderProps = Pick<UserProfileType, "displayName" | "user"> & Pick<CommentType, "createdAt" | "updatedAt">;

export function CommentHeader({ displayName, user, createdAt, updatedAt }: CommentHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.userZone}>
        <DuotoneUserIcon />
        <Text size="xs" weight="medium">{displayName! || user!.username}</Text>
        <Text size="xs" className={styles.date}>· {updatedAt ? `Atualizado ${formatDate(updatedAt!)}` : formatDate(createdAt!)}</Text>
      </div>
      <Icon icon="ellipsis-h" className={styles.reportIcon} disabled />
    </div>
  );
}


