"use client";

import type { ImageType } from "@classes/APIManager/base/types/Models.types";
import { Icon } from "@components/Icon";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./SingleImageModal.module.css";
import Image from "next/image";

type SingleImageModalProps = {
  children: React.ReactNode;
  image: ImageType;
};

export const SingleImageModal = ({ children, image }: SingleImageModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger data-src={image.src!}>{children}</Dialog.Trigger>
      <Dialog.Overlay className={styles.dialogOverlay}>
        <Dialog.Content className={styles.dialogContent}>
          <div className={styles.dialogNav}>
            <Icon icon="arrow-left" className={styles.dialogNavIcon} onClick={() => setOpen(false)} />
          </div>
          <Image
            key={`modal:singleModalImage:imagem:${image.src}`}
            alt={`Imagem ${image.name}`} src={`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${image.src!}`}
            width={image.width} height={image.height}
            className={styles.modalImage}
          />
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
};