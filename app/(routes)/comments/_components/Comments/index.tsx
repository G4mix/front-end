import type { CommentType } from "@classes/APIManager/types/Models.types";
import { Comment } from "../Comment";
import { Text } from "@components/Text";
import { Icon } from "@components/Icon";
import styles from "./Comments.module.css";
import React from "react";

type CommentsProps = {
  comments: CommentType[];
}

export function Comments({ comments }: CommentsProps) {
  if (!comments || comments.length === 0) {
    return (
      <div className={styles.withoutComments}>
        <Text size="xs" weight="medium">Ninguém comentou ainda...</Text>
      </div>
    );
  }

  return (
    <div className={styles.comments}>
      {
        comments.map((comment: CommentType, index: number) =>
          <div className={styles.commentZone} key={`commentZone:number:${index}`}>
            <div className={styles.comments}>
              <Comment
                comment={comment}
              />
              {
                comment.replies && comment.replies.map((reply: CommentType, i: number) =>
                  <Comment
                    key={`commentZone:number:${index}reply:number:${i}`}
                    comment={reply}
                    isReply
                  />
                )
              }
            </div>
            <div className={styles.moreAwsners}>
              <Text size="xs" weight="medium">Ver mais respostas</Text>
              <Icon icon="down" className={styles.showMoreIcon} />
            </div>
          </div>
        )
      }
    </div>
  );
}