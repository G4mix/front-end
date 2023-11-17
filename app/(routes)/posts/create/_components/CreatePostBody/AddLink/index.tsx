"use client";

import { useCreatePostContext } from "@contexts/CreatePostContext";
import { Icon } from "@components/Icon";
import React, { useCallback } from "react";
import styles from "./AddLink.module.css";

export const AddLink = () => {
  const { openAddLink, handleToggleAddLink, handleAddLink } = useCreatePostContext();

  const handleKeyDown = useCallback(async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      e.preventDefault();
      const url = e.currentTarget.value;
      handleAddLink(url);
      handleToggleAddLink();
      e.currentTarget.value = "";
    }
  }, []);

  if (!openAddLink) return null;
  
  return (
    <div className={styles.postContentAddLink}>
      <input
        type="text" className={styles.linkInput}
        onKeyDown={handleKeyDown}
        placeholder="Insira o link aqui"
      />
      <Icon className={styles.cancelAddLink} icon="x" onClick={handleToggleAddLink} />
    </div>
  );
};