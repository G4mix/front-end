"use client";

import { CommentMutationManager } from "@/app/_classes/APIManager/comment/CommentMutationManager";
import { useMessagesContext } from "@contexts/global/MessagesContext";
import { EmojiPicker } from "@components/EmojiPicker";
import { useSession } from "@contexts/global/SessionContext";
import { apiErrors } from "@/app/_constants/apiErrors";
import { useRouter } from "next/navigation";
import { TextArea } from "@components/TextArea";
import { Icon } from "@components/Icon";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import styles from "./Answer.module.css";

export type AnswerMethods = {
  handleAnswerFocus: () => void;
  handleUserToMark: (username: string) => void;
};

type AnswerProps = {
  postId: number;
};

const Answer = forwardRef<AnswerMethods, AnswerProps>(({ postId }, ref) => {
  const { handleShowMessage } = useMessagesContext();
  const { status } = useSession();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  
  const handleAnswerFocus = useCallback(() => {
    textAreaRef.current?.focus();
  }, []);

  const handleUserToMark = useCallback((username: string) => {
    if (textAreaRef.current) {
      textAreaRef.current.value = `@${username} ${textAreaRef.current.value}`;
    }
  }, []);

  useImperativeHandle(ref, () => {
    return {
      handleAnswerFocus,
      handleUserToMark
    };
  }, []);

  const handleOnSelect = useCallback((emoji: string) => {
    if (textAreaRef.current) {
      textAreaRef.current.value = `${textAreaRef.current.value}${emoji}`;
      handleAnswerFocus();
    }
  }, []);

  const handlePostComment = useCallback(async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!textAreaRef.current) {
      return;
    }

    if (status === "unauthenticated") {
      return router.push("/auth/signin");
    }
    
    const content = textAreaRef.current.value;

    const comment = await CommentMutationManager.commentPost(postId, content);
    if (!comment || comment["error"]) {
      if (comment && comment["error"] && apiErrors.includes(comment!.error!)) {
        handleShowMessage(comment!.message!);
      }
      handleShowMessage("Ocorreu um erro ao tentar comentar!");
    }
    console.log(comment);

    textAreaRef.current.value = "";
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [status]);

  useEffect(() => {
    if (textAreaRef.current) {
      handleAnswerFocus();
    }
  }, []);

  return (
    <div className={styles.answer}>
      <div className={styles.emojisSide}>
        <EmojiPicker
          onSelect={handleOnSelect}
        />
        <TextArea
          name="answer input" placeholder="Responder"
          rows={1} className={styles.answerArea}
          maxLength={200} ref={textAreaRef}
          autoResize
        />
      </div>
      <div className={styles.sendIconBox} onClick={handlePostComment}>
        <Icon icon="paper-plane" />
      </div>
    </div>
  );
});

Answer.displayName = "Answer";

export { Answer };