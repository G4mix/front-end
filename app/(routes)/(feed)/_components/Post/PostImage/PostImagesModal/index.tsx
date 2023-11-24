"use client";

import type { PostImageProps } from "..";
import type { ImageType } from "@/app/_classes/APIManager/base/types/Models.types";
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

const PostImagesModal = forwardRef<ImagesModalHandler, PostImageProps>(({ images }, ref) => {
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
            images!.map((img: ImageType) =>
              <SingleImageModal
                key={`modal:imagem:${img.src}`}
                image={img}
              >
                <Image
                  alt={`Imagem: ${img.name}`} src={`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${img!.src!}`}
                  width={img.width} height={img.height}
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