"use client";

import { EmojiPicker } from "@components/EmojiPicker";
import { useSession } from "@functions/useSession";
import { TextArea } from "@components/TextArea";
import { Icon } from "@components/Icon";
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import styles from "./Answer.module.css";

export type AnswerMethods = {
  handleAnswerFocus: () => void;
  handleUserToMark: (username: string) => void;
};

const Answer = forwardRef<AnswerMethods>((_props, ref) => {
  const { session } = useSession();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
  });

  const handleOnSelect = useCallback((emoji: string) => {
    if (textAreaRef.current) {
      textAreaRef.current.value = `${textAreaRef.current.value}${emoji}`;
      handleAnswerFocus();
    }
  }, []);

  const handlePostComment = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!textAreaRef.current) {
      console.log("Você precisa digitar algo.");
      return;
    }
    console.log(`O usuário: "${session!.username}", postou o comentário:\n${textAreaRef.current.value}`);
    textAreaRef.current.value = "";
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [session]);

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