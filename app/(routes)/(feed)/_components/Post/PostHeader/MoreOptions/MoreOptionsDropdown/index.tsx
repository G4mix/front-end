"use client";

import type { OwnerPostState } from "@contexts/post/PostOptionsContext";
import { Button } from "@components/Button";
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
  const [openConfirm, setOpenConfirm] = useState(false);
  const { id, handleDeletePost } = ownerPostDropdown;

  const handleClick = async () => {
    setOpen(false);
    if (deletingPost) return;
    setDeletingPost(true);
    await handleDeletePost();
    setDeletingPost(false);
  };

  const handleClose = () => {
    setOpenConfirm(false);
  };

  return (
    <Dialog.Root modal={false} open={open} onOpenChange={setOpen}>
      <Dialog.Content className={`${styles.dropdownContent} ${className}`}>
        <Link href={`/posts/${id}/update`} className={styles.dropdownContentItem}>
          <Icon icon="pen-to-square" className={styles.dropdownContentItemIcon} />
          <Text size="md">Atualizar</Text>
        </Link>
        <Dialog.Root modal open={openConfirm} onOpenChange={setOpenConfirm}>
          <Dialog.Trigger>
            <div className={styles.dropdownContentItem}>
              <Icon icon="trash-can" className={styles.dropdownContentItemIcon} />
              <Text size="md">Deletar</Text>
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className={styles.dialogOverlay} />
            <Dialog.Content className={styles.confirmDropdownContent}>
              <Text size="xs" align="justify">Você tem certeza de que quer deletar o Post?</Text>
              <div className={styles.confirmOptions}>
                <Button className={`${styles.button} ${styles.confirmButton}`}>
                  <Text size="xs" onClick={handleClick}>Confirmar</Text>
                </Button>
                <Button className={`${styles.button} ${styles.cancelButton}`}>
                  <Text size="xs" onClick={handleClose}>Cancelar</Text>
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};