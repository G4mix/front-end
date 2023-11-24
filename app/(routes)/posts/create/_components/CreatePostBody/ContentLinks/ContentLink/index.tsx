"use client";

import { useCreatePostContext } from "@contexts/create/CreatePostContext";
import { PostLink } from "@/app/(routes)/(feed)/_components/Post/PostLink";
import { Icon } from "@components/Icon";
import styles from "./ContentLink.module.css";
import React from "react";
import { useMessagesContext } from "@contexts/global/MessagesContext";

type ContentLinkProps = {
  url: string;
};

export const ContentLink = ({ url }: ContentLinkProps) => {
  const { handleShowMessage } = useMessagesContext();
  const { handleRemoveLink } = useCreatePostContext();
  const handleError = () => {
    handleShowMessage(`Erro ao buscar as informações do url: "${url}"`);
    handleRemoveLink(url);
  };

  return (
    <PostLink url={url} handleError={handleError}>
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