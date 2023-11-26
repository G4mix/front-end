"use client";

import type { OwnerPostState } from "@contexts/post/PostOptionsContext";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./MoreOptionsDropdown.module.css";
import Link from "next/link";

type MoreOptionsDropdownProps = {
  ownerPostDropdown: OwnerPostState;
  className?: string;
  setOpen: (open: boolean) => void;
  open: boolean;
};

export const MoreOptionsOwnerDropdown = ({ ownerPostDropdown, open, setOpen, className="" }: MoreOptionsDropdownProps) => {
  const [deletingPost, setDeletingPost] = useState(false);
  const { id, handleDeletePost } = ownerPostDropdown;
  const handleClick = async () => {
    setOpen(false);
    if (deletingPost) return;
    setDeletingPost(true);
    await handleDeletePost();
    setDeletingPost(false);
  };

  return (
    <Dialog.Root modal={false} open={open} onOpenChange={setOpen}>
      <Dialog.Content className={`${styles.dropdownContent} ${className}`}>
        <Link href={`/posts/${id}/update`} className={styles.dropdownContentItem}>
          <Icon icon="pen-to-square" className={styles.dropdownContentItemIcon} />
          <Text size="md">Atualizar</Text>
        </Link>
        <div className={styles.dropdownContentItem} onClick={handleClick}>
          <Icon icon="trash-can" className={styles.dropdownContentItemIcon} />
          <Text size="md">Deletar</Text>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};