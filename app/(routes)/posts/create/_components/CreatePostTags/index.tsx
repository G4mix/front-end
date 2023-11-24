"use client";

import { useCreatePostContext } from "@contexts/create/CreatePostContext";
import { Text } from "@components/Text";
import { Icon } from "@components/Icon";
import React, { useCallback } from "react";
import styles from "./CreatePostTags.module.css";

export const CreatePostTags = () => {
  const { tags, handleSelectTag, handleUnselectTag } = useCreatePostContext();
  const popularTags = ["Design", "Sound Design", "Art 2D", "Art 3D", "Script"];

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      e.preventDefault();
      handleSelectTag(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  }, []);

  return (
    <div className={styles.postTags}>
      <Text size="xs">Tags</Text>
      <div className={styles.selectedTags}>
        <Icon icon="circle-plus" className={styles.circlePlusIcon} withoutClick />
        {
          tags.map((tag: string) =>
            <Text
              className={styles.tag}
              size="xs"
              key={`selectedTag:${tag}`}
              onClick={() => handleUnselectTag(tag)}
            >
              {tag}
            </Text>
          )
        }
        <input className={styles.tagInput} type="text" onKeyDown={handleKeyDown} />
      </div>
      <div className={styles.popularTags}>
        {
          popularTags.filter(tag => !tags.includes(tag)).map((popularTag: string) => 
            <Text
              className={styles.tag} size="xs" key={`popularTag:${popularTag}`}
              onClick={() => handleSelectTag(popularTag)}
            >
              {popularTag}
            </Text>
          )
        }
      </div>
    </div>
  );
};