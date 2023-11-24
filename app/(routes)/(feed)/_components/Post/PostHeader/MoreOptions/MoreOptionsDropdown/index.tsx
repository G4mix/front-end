"use client";

import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./MoreOptionsDropdown.module.css";
import React, { useCallback } from "react";
import Link from "next/link";

type MoreOptionsDropdownProps = {
  handleDeletePost: () => void;
  setOpen: (open: boolean) => void;
  open: boolean;
  id?: number; 
};

export const MoreOptionsOwnerDropdown = ({ id, open, setOpen, handleDeletePost }: MoreOptionsDropdownProps) => {
  const handleClick = useCallback(() => {
    setOpen(false);
    handleDeletePost();
  }, []);

  return (
    <Dialog.Root modal={false} open={open} onOpenChange={setOpen}>
      <Dialog.Content className={styles.dropdownContent}>
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