import { CommentType } from "@classes/APIManager/base/types/Models.types";
import { Comment } from "../Comment";
import { Text } from "@components/Text";
import { Icon } from "@components/Icon";
import React, { useState } from "react";
import styles from "./Replies.module.css";

type RepliesProps = {
  handleWantToRespond: ({ comment, isReply }: { comment: CommentType; isReply?: boolean; }) => void;
  markedToReply: CommentType;
  comment: CommentType;
};

export const Replies = ({ comment, handleWantToRespond, markedToReply }: RepliesProps) => {
  const [showAllReplies, setShowAllReplies] = useState(false);
  const repliesToRender = showAllReplies ? comment.replies! : comment.replies!.slice(0, 2);
  return (
    <div className={styles.replies}>
      {
        comment.replies && repliesToRender.map((reply: CommentType) =>
          <Comment
            key={`commentZone:number:${comment.id}reply:number:${reply.id}`}
            handleWantToRespond={handleWantToRespond}
            marked={markedToReply !== null && markedToReply.id === reply.id}
            comment={reply}
            isReply
          />
        )
      }
      {
        comment.replies!.length > 2 && (
          <div className={styles.moreAwsners} onClick={() => setShowAllReplies(!showAllReplies)}>
            <Text size="xs" weight="medium">{showAllReplies ? "Ver menos respostas" : "Ver mais respostas"}</Text>
            <Icon icon="down" className={`${styles.showIcon} ${showAllReplies ? styles.showMinus : ""}`} />
          </div>
        )
      }
    </div>
  );
};