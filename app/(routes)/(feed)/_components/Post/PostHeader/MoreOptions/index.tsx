"use client";

import { useFeedOptionsContext } from "@contexts/feed/FeedOptionsContext";
import { PostMutationManager } from "@classes/APIManager/posts/PostMutationManager";
import { useSession } from "@contexts/global/SessionContext";
import { PostType } from "@/app/_classes/APIManager/base/types/Models.types";
import { Icon } from "@components/Icon";
import React, { useCallback, useState } from "react";

type MoreOptionsProps = {
  handleDeletePost?: () => void;
} & Pick<PostType, "author" | "id">;

export const MoreOptions = ({ id, author, handleDeletePost }: MoreOptionsProps) => {
  const { handleToggleOwnerPostDropdown } = useFeedOptionsContext();
  const [deletingPost, setDeletingPost] = useState(false);
  const { session } = useSession();

  const handleDeletePostOption = async () => {
    if (deletingPost) return;
    setDeletingPost(true);
    await PostMutationManager.deletePost(id!);
    if (handleDeletePost) handleDeletePost();      
    setDeletingPost(false);
  };

  const handleOnClick = useCallback(() => {
    handleToggleOwnerPostDropdown(handleDeletePostOption!, id!);
  }, []);

  return (
    <>
      {
        session && session.username === author!.user!.username ? (
          <Icon icon="ellipsis-h" width={16} height={16} onClick={handleOnClick} />
        ) : (
          <Icon icon="ellipsis-h" width={16} height={16} disabled />
        )
      }
    </>
  );
};