"use client";

import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./MoreOptionsDropdown.module.css";
import React from "react";
import Link from "next/link";

type MoreOptionsDropdownProps = {
  handleDeletePost: () => void;
  children: React.ReactNode;
  id?: number; 
};

export const MoreOptionsDropdown = ({ id, children, handleDeletePost }: MoreOptionsDropdownProps) => {
  return (
    <Dialog.Root modal={false}>
      <Dialog.Trigger>
        {children}
      </Dialog.Trigger>
      <Dialog.Content className={styles.dropdownContent}>
        <Link href={`/posts/${id}/edit`} className={styles.dropdownContentItem}>
          <Icon icon="pen-to-square" className={styles.dropdownContentItemIcon} />
          <Text size="md">Atualizar</Text>
        </Link>
        <div className={styles.dropdownContentItem} onClick={handleDeletePost}>
          <Icon icon="trash-can" className={styles.dropdownContentItemIcon} />
          <Text size="md">Deletar</Text>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};