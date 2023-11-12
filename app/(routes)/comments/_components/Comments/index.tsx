"use client";

import type { CommentType } from "@classes/APIManager/types/Models.types";
import { MarkedToReply } from "../MarkedToReply";
import { Comment } from "../Comment";
import { Answer, type AnswerMethods } from "../Answer";
import { Text } from "@components/Text";
import { Icon } from "@components/Icon";
import React, { useRef, useState, useCallback } from "react";
import styles from "./Comments.module.css";

type CommentsProps = {
  comments: CommentType[];
}

export const Comments = ({ comments }: CommentsProps) => {
  const [markedToReply, setMarkedToReply] = useState<CommentType | null>(null);
  const answerRef = useRef<AnswerMethods>(null);

  const handleAnswerFocus = useCallback(() => {
    answerRef.current?.handleAnswerFocus();
  }, []);

  const handleUserToMark = useCallback((username: string) => {
    answerRef.current?.handleUserToMark(username);
  }, []);

  const handleWantToRespond = ({ comment, isReply }: { comment: CommentType; isReply: boolean; }) => {
    setMarkedToReply(comment);
    if (isReply) {
      handleUserToMark(comment.author!.user!.username!);
    }
    handleAnswerFocus();
  };

  const handleUnmarkToReply = () => {
    setMarkedToReply(null);
  };

  if (!comments || comments.length === 0) {
    return (
      <div className={styles.withoutComments}>
        <Text size="xs" weight="medium">Ninguém comentou ainda...</Text>
      </div>
    );
  }

  return (
    <>
      <div className={styles.comments}>
        {
          comments.map((comment: CommentType, index: number) =>
            <div className={styles.commentZone} key={`commentZone:number:${index}`}>
              <div className={styles.comments}>
                <Comment
                  handleWantToRespond={handleWantToRespond}
                  comment={comment}
                  marked={markedToReply !== null && markedToReply.id === comment.id}
                />
                {
                  comment.replies && comment.replies.map((reply: CommentType, i: number) =>
                    <Comment
                      key={`commentZone:number:${index}reply:number:${i}`}
                      handleWantToRespond={handleWantToRespond}
                      marked={markedToReply !== null && markedToReply.id === reply.id}
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
      <div className={styles.answerZone}>
        <MarkedToReply
          handleUnmarkToReply={handleUnmarkToReply}
          markedToReply={markedToReply!}
        />
        <Answer
          ref={answerRef}
        />
      </div>
    </>
  );
};