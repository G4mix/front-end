import type { CommentType } from "@classes/APIManager/types/Models.types";
import { Comment } from "@components/Comment";
import { Text } from "@components/Text";
import { Icon } from "@components/Icon";
import styles from "./Comments.module.css";
import React from "react";

type CommentsProps = {
  comments: CommentType[];
}

export function Comments({ comments }: CommentsProps) {
  return (
    <div className={styles.comments}>
      {
        comments.map((comment: CommentType) =>
          <div className={styles.commentZone}>
            <div className={styles.comments}>
              <Comment
                content={comment.content}
                likes={comment.likes}
              />
              {
                comment.replies && comment.replies.map((reply: CommentType) =>
                  <Comment
                    content={reply.content}
                    likes={reply.likes}
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