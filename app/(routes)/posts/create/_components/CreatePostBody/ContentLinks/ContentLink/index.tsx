"use client";

import { useCreatePostContext } from "@contexts/CreatePostContext";
import { PostLink } from "@/app/(routes)/(feed)/_components/Post/PostLink";
import { Icon } from "@components/Icon";
import styles from "./ContentLink.module.css";
import React from "react";

type ContentLinkProps = {
  url: string;
};

export const ContentLink = ({ url }: ContentLinkProps) => {
  const { handleRemoveLink } = useCreatePostContext();

  return (
    <PostLink>
      <Icon icon="x" className={styles.removeLink} onClick={() => handleRemoveLink(url)} />
    </PostLink>
  );
};