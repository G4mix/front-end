import { DuotoneUserIcon } from "@components/Post/DuotoneUserIcon";
import { CommentType } from "@classes/APIManager/types/Models.types";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import styles from "./MarkedToReply.module.css";
import React from "react";

type MarkedToReplyProps = {
  handleUnmarkToReply: () => void;
  markedToReply: CommentType;
}

export const MarkedToReply = ({ markedToReply, handleUnmarkToReply }: MarkedToReplyProps) => {
  if (markedToReply === null) return null;

  return (
    <div className={styles.markedToReply}>
      <div className={styles.userZone}>
        <DuotoneUserIcon />
        <Text size="default" weight="medium">{markedToReply!.author!.displayName! || markedToReply!.author!.user!.username!}</Text>
      </div>
      <Icon icon="x" onClick={handleUnmarkToReply} />
    </div>
  );
};