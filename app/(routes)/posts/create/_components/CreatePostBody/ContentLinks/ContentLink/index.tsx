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
    <PostLink url={url}>
      <Icon 
        icon="x" className={styles.removeLink}
        onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
          e.preventDefault();
          handleRemoveLink(url);
        }} 
      />
    </PostLink>
  );
};