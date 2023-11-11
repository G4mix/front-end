import { DuotoneUserIcon } from "@components/Post/DuotoneUserIcon";
import { Heading } from "@components/Heading";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import styles from "./PostHeader.module.css";
import React from "react";

type PostHeaderProps = {
  username: string | null;
  date: string | null;
};

export function PostHeader({ username, date }: PostHeaderProps) {
  return(
    <div className={styles.postHeader}>
      <div className={styles.postUser}>
        <DuotoneUserIcon />
        <Heading size="sm" asChild>
          <h5>{username}</h5>
        </Heading>
        <Text size="xs" weight="thin">· {date}</Text>
      </div>
      <Icon icon="ellipsis-h" width={16} height={16} disabled />
    </div>
  );
}