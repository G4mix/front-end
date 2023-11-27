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
  const [comments, setComments] = useState<CommentType[]>([]);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [searching, setSearching] = useState(false);
  const [page, setPage] = useState(0);

  const [markedToReply, setMarkedToReply] = useState<CommentType | null>(null);
  const { filterBy } = useCommentsContext();
  const answerRef = useRef<AnswerMethods>(null);

  const getComments = async () => {
    if (searching) return;
    setSearching(true);
    const allComments = await CommentQueryManager.findAllCommentsOfAPost(postId, page);

    if (!allComments || allComments.error || allComments.length === 0) {
      setSearching(false);
      return setAllPostsLoaded(true);
    }

    if (page === 0) {
      console.log("Salve");
      setSearching(false);
      return setComments(allComments);
    }

    if (allComments.length < 10) setAllPostsLoaded(true);
    setSearching(false);
    setComments(prevComments => (mergeArray(prevComments, allComments) as CommentType[]));
  };

  const handleGlobalScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (
      scrollHeight - scrollTop === clientHeight && !searching && !allPostsLoaded
    ) {
      setPage(prevPage => prevPage + 1);
    }
  }, [searching, allPostsLoaded]);
  
  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleGlobalScroll);
    return () => {
      window.removeEventListener("scroll", handleGlobalScroll);
    };
  }, []);

  useEffect(() => {
    if (page !== 0 && !allPostsLoaded) getComments();
  }, [page, allPostsLoaded]);

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
                  marked={markedToReply !== null && markedToReply.id === comment.id}
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
          handleUnmarkToReply={handleUnmarkToReply}
          markedToReply={markedToReply!}
        />
        <Answer
          ref={answerRef}
          postId={postId}
        />
      </div>
    </>
  );
};