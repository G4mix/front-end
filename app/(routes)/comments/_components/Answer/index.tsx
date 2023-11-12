"use client";

import { EmojiPicker } from "@components/EmojiPicker";
import { useSession } from "@functions/useSession";
import { TextArea } from "@components/TextArea";
import { Icon } from "@components/Icon";
import React, { useCallback, useEffect, useRef } from "react";
import styles from "./Answer.module.css";

export function Answer() {
  const { session } = useSession();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleOnSelect = useCallback((emoji: any) => {
    if (textAreaRef.current) {
      textAreaRef.current.value = `${textAreaRef.current.value}${emoji}`
    }
  }, []);

  const handlePostComment = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (textAreaRef.current) {
      console.log(`O usuário: "${session!.username}", postou o comentário:\n${textAreaRef.current.value}`);
    }
  }, [session]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
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
          ref={textAreaRef} autoResize
        />
      </div>
      <div className={styles.sendIconBox} onClick={handlePostComment}>
        <Icon icon="paper-plane" />
      </div>
    </div>
  );
}