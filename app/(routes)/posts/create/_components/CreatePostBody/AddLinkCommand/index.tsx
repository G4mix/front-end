"use client";

import { useCreatePostContext } from "@contexts/create/CreatePostContext";
import { Icon } from "@components/Icon";
import styles from "../CreatePostBody.module.css";
import React from "react";

export const AddLinkCommand = () => {
  const { handleToggleAddLink } = useCreatePostContext();

  return (
    <Icon icon="link" className={styles.postCommandIcon} onClick={() => handleToggleAddLink()} />
  );
};