"use client";

import type { PostImageProps } from "..";
import { SingleImageModal } from "../SingleImageModal";
import { Text } from "@components/Text";
import { Icon } from "@components/Icon";
import React, { useState, useImperativeHandle, forwardRef, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./PostImagesModal.module.css";
import Image from "next/image";

export type ImagesModalHandler = {
  handleOpenModal: () => void;
};

const PostImagesModal = forwardRef<ImagesModalHandler, PostImageProps>(({ images, title }, ref) => {
  const [open, setOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      handleOpenModal
    };
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);
  
  return (
    <Dialog.Root open={open}>
      <Dialog.Overlay className={styles.dialogOverlay}>
        <Dialog.Content className={styles.dialogContent}>
          <div className={styles.dialogNav}>
            <Icon icon="arrow-left" className={styles.dialogNavIcon} onClick={handleCloseModal} />
            <Text size="xs">{images!.length} imagens</Text>
          </div>
          {
            images!.map((img: string) =>
              <SingleImageModal
                key={`modal:imagem:${img}`}
                image={img} title={title}
              >
                <Image
                  alt={`Imagem do post ${title}`} src={img}
                  width={500} height={300}
                  className={styles.modalImage}
                />
              </SingleImageModal>
            )
          }
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
});

PostImagesModal.displayName = "PostImagesModal";

export { PostImagesModal };