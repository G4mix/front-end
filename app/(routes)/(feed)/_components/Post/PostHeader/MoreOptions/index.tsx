"use client";

import { MoreOptionsDropdown } from "./MoreOptionsDropdown";
import { useSession } from "@contexts/SessionContext";
import { PostType } from "@classes/APIManager/types/Models.types";
import { Icon } from "@components/Icon";
import React from "react";

type MoreOptionsProps = {
  handleDeletePost: () => void;
} & Pick<PostType, "author" | "id">;

export const MoreOptions = ({ author, id, handleDeletePost }: MoreOptionsProps) => {
  const { session } = useSession();

  return (
    <>
      {
        session && session.username === author!.user!.username ? (
          <MoreOptionsDropdown id={id} handleDeletePost={handleDeletePost}>
            <Icon icon="ellipsis-h" width={16} height={16} />
          </MoreOptionsDropdown>
        ) : (
          <Icon icon="ellipsis-h" width={16} height={16} disabled />
        )
      }
    </>
  );
};