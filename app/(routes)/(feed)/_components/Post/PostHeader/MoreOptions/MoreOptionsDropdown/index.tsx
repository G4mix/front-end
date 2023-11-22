"use client";

import { Text } from "@components/Text";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./MoreOptionsDropdown.module.css";
import React from "react";
import Link from "next/link";

type MoreOptionsDropdownProps = { children: React.ReactNode; id?: number; };

export const MoreOptionsDropdown = ({ id, children }: MoreOptionsDropdownProps) => {
  return (
    <Dialog.Root modal={false}>
      <Dialog.Trigger>
        {children}
      </Dialog.Trigger>
      <Dialog.Overlay className={styles.dialogOverlay}>
        <Dialog.Content className={styles.dropdownContent}>
          <Link href={`/posts/${id}/edit`}>
            <Text>Atualizar</Text>
          </Link>
          <Text>Deletar</Text>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
};