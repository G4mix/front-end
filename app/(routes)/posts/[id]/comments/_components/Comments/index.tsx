"use client";

import type { CommentType } from "@classes/APIManager/types/Models.types";
import { Answer, type AnswerMethods } from "../Answer";
import { useCommentsContext } from "../CommentsProvider";
import { MarkedToReply } from "../MarkedToReply";
import { Comment } from "../Comment";
import { Replies } from "../Replies";
import { Text } from "@components/Text";
import React, { useRef, useState, useCallback } from "react";
import styles from "./Comments.module.css";

type CommentsProps = {
  comments: CommentType[];
};

export const Comments = ({ comments }: CommentsProps) => {
  const [markedToReply, setMarkedToReply] = useState<CommentType | null>(null);
  const { filterBy } = useCommentsContext();
  const answerRef = useRef<AnswerMethods>(null);

  const filterComments = useCallback(() => {
    if (filterBy === "recent") {
      return comments.sort((a, b) => {
        const dateA = a.updatedAt || a.createdAt!;
        const dateB = b.updatedAt || b.createdAt!;
    
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
    } else if (filterBy === "relevant") {
      return comments.sort((a, b) => b!.likes! - a!.likes!);
    }

    return comments.sort(() => Math.random() - 0.5);
  }, [filterBy]);

  const filteredComments = filterComments();

  const handleAnswerFocus = useCallback(() => {
    answerRef.current?.handleAnswerFocus();
  }, []);

  const handleUserToMark = useCallback((username: string) => {
    answerRef.current?.handleUserToMark(username);
  }, []);

  const handleWantToRespond = useCallback(({ comment, isReply }: { comment: CommentType; isReply: boolean; }) => {
    setMarkedToReply(comment);
    if (isReply) {
      handleUserToMark(comment.author!.user!.username!);
    }
    handleAnswerFocus();
  }, []);

  const handleUnmarkToReply = useCallback(() => {
    setMarkedToReply(null);
  }, []);


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
          filteredComments.map((comment: CommentType) =>
            <div className={styles.commentZone} key={`commentZone:comment:${comment.id}`}>
              <Comment
                handleWantToRespond={handleWantToRespond}
                comment={comment}
                marked={markedToReply !== null && markedToReply.id === comment.id}
              />
              <Replies
                comment={comment}
                markedToReply={markedToReply!}
                handleWantToRespond={handleWantToRespond}
              />
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