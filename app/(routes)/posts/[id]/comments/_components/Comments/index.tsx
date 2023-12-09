"use client";

import type { CommentType } from "@classes/APIManager/base/types/Models.types";
import { Answer, type AnswerMethods } from "../Answer";
import { useCommentsContext } from "@contexts/post/CommentsContext";
import { MarkedToReply } from "../MarkedToReply";
import { Comment } from "../Comment";
import { Replies } from "../Replies";
import { Text } from "@components/Text";
import React, { useRef, useState, useCallback, useEffect } from "react";
import styles from "./Comments.module.css";
import { CommentQueryManager } from "@/app/_classes/APIManager/comment/CommentQueryManager";
import { mergeArray } from "@/app/_functions/mergeArray";

type CommentsProps = {
  className?: React.HtmlHTMLAttributes<HTMLDivElement>["className"];
  postId: number;
};

export const Comments = ({ postId, className="" }: CommentsProps) => {
  const [allCommentsLoaded, setAllCommentsLoaded] = useState(false);
  const [markedToReply, setMarkedToReply] = useState<{ commentToRes: CommentType; commentToMark: CommentType; } | null>(null);
  const [searching, setSearching] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [page, setPage] = useState(0);
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
      return comments.sort((a, b) => b!.likesCount! - a!.likesCount!);
    }

    return comments.sort(() => Math.random() - 0.5);
  }, [filterBy, comments]);

  const filteredComments = filterComments();

  const handleAnswerFocus = useCallback(() => {
    answerRef.current?.handleAnswerFocus();
  }, []);

  const handleUserToMark = useCallback((username: string) => {
    answerRef.current?.handleUserToMark(username);
  }, []);

  const handleRenderNewComment = (comment: CommentType) => {
    comment.replies = [];
    if (comment.parentComment) {
      const parentComment = comments.find(commentToFind => commentToFind.id === comment!.parentComment!.id);
      if (!parentComment) return;
      if (!parentComment.replies) parentComment.replies = [];
      parentComment.replies.push(comment);
      setComments([...comments]);
    } else {
      setComments([...comments, comment]);
    }
  };
  
  const handleWantToRespond = ({ comment, isReply }: { comment: CommentType; isReply?: boolean; }) => {
    setMarkedToReply({
      commentToMark: comment,
      commentToRes: comment.parentComment ? comment.parentComment! : comment 
    });
    if (isReply) {
      handleUserToMark(comment.author!.user!.username!);
    }
    handleAnswerFocus();
  };

  const getComments = async () => {
    if (searching) return;
    setSearching(true);
    const allComments = await CommentQueryManager.findAllCommentsOfAPost(postId, page);
    
    if (!allComments || (allComments && allComments.error || allComments.length === 0)) {
      setSearching(false);
      return setAllCommentsLoaded(true);
    }

    if (page === 0) {
      setSearching(false);
      return setComments(allComments);
    }

    if (allComments.length < 10) setAllCommentsLoaded(true);
    setSearching(false);
    setComments(prevComments => (mergeArray(prevComments, allComments) as CommentType[]));
  };

  const handleGlobalScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const scrollThreshold = 100;
    const needToRenderMore = scrollHeight - scrollTop <= clientHeight + scrollThreshold;
    if (!needToRenderMore || searching || allCommentsLoaded) return;
    setPage(prevPage => prevPage + 1);
  }, [searching, allCommentsLoaded]);

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    if (page !== 0 && !allCommentsLoaded) getComments();
  }, [page, allCommentsLoaded]);

  useEffect(() => {
    window.addEventListener("scroll", handleGlobalScroll);
    return () => {
      window.removeEventListener("scroll", handleGlobalScroll);
    };
  }, []);
  
  return (
    <>
      <div className={`${styles.comments} ${className}`}>
        {
          !comments || comments.length === 0 ? (
            <div className={`${styles.withoutComments} ${className}`}>
              <Text size="xs" weight="medium">Ninguém comentou ainda...</Text>
            </div>
          ) : (
            filteredComments.map((comment: CommentType) =>
              <div className={styles.commentZone} key={`commentZone:comment:${comment.id}`}>
                <Comment
                  handleWantToRespond={handleWantToRespond}
                  comment={comment}
                  marked={markedToReply !== null && markedToReply.commentToMark.id === comment.id}
                />
                <Replies
                  comment={comment}
                  markedToReply={markedToReply!}
                  handleWantToRespond={handleWantToRespond}
                />
              </div>
            )
          )
        }
      </div>
      <div className={styles.answerZone}>
        <MarkedToReply
          handleUnmarkToReply={() => setMarkedToReply(null)}
          markedToReply={markedToReply!}
        />
        <Answer
          handleUnmarkToReply={() => setMarkedToReply(null)}
          handleRenderNewComment={handleRenderNewComment}
          markedToReply={markedToReply!}
          ref={answerRef}
          postId={postId}
        />
      </div>
    </>
  );
};