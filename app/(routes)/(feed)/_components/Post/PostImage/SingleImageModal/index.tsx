"use client";

import type { PostType } from "@classes/APIManager/types/Models.types";
import { Icon } from "@components/Icon";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./SingleImageModal.module.css";
import Image from "next/image";

type SingleImageModalProps = {
  children: React.ReactNode;
  image: string;
} & Pick<PostType, "title">;

export const SingleImageModal = ({ children, image, title }: SingleImageModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger data-src={image}>{children}</Dialog.Trigger>
      <Dialog.Overlay className={styles.dialogOverlay}>
        <Dialog.Content className={styles.dialogContent}>
          <div className={styles.dialogNav}>
            <Icon icon="arrow-left" className={styles.dialogNavIcon} onClick={() => setOpen(false)} />
          </div>
          <Image
            key={`modal:singleModalImage:imagem:${image}`}
            alt={`Imagem do post ${title}`} src={image}
            width={500} height={300}
            className={styles.modalImage}
          />
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
};