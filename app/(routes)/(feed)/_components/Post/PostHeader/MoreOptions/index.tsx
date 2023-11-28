"use client";

import { usePostOptionsContext } from "@/app/_contexts/post/PostOptionsContext";
import { PostMutationManager } from "@classes/APIManager/posts/PostMutationManager";
import { useSession } from "@contexts/global/SessionContext";
import { PostType } from "@classes/APIManager/base/types/Models.types";
import { Icon } from "@components/Icon";
import React, { useCallback } from "react";

type MoreOptionsProps = {
  handleDeletePost?: () => void;
} & Pick<PostType, "author" | "id">;

export const MoreOptions = ({ id, author, handleDeletePost }: MoreOptionsProps) => {
  const { handleToggleOwnerPostDropdown } = usePostOptionsContext();
  const { session } = useSession();

  const handleDeletePostOption = async () => {
    await PostMutationManager.deletePost(id!);
    if (handleDeletePost) handleDeletePost();
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