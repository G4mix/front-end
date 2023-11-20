"use client";

import type { PostImageProps } from "..";
import { Text } from "@components/Text";
import { Icon } from "@components/Icon";
import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./PostImagesModal.module.css";
import Image from "next/image";

export type ImagesModalHandler = {
  handleOpenModal: (selectedImage: string) => void;
};

const PostImagesModal = forwardRef<ImagesModalHandler, PostImageProps>(({ images, title }, ref) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState(images![0]);
  const [open, setOpen] = useState(false);

  const handleOpenModal = useCallback((selectedImage: string) => {
    setSelectedImage(selectedImage);
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

  useEffect(() => {
    const selectedImgElement = document.querySelector(
      `img[src='${selectedImage}']`
    );
    console.log(selectedImgElement);

    if (selectedImgElement) {
      selectedImgElement.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedImage]);


  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Overlay className={styles.dialogOverlay}>
        <Dialog.Content className={styles.dialogContent} ref={modalRef}>
          <div className={styles.dialogNav}>
            <Icon icon="arrow-left" className={styles.dialogNavIcon} onClick={handleCloseModal} />
            <Text size="xs">{images!.length} imagens</Text>
          </div>
          {
            images!.map((img: string) => 
              <Image
                key={`modal:imagem:${img}`}
                alt={`Imagem do post ${title}`} src={img}
                width={500} height={300}
                className={styles.modalImage}
              />
            )
          }
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
});

PostImagesModal.displayName = "PostImagesModal";

export { PostImagesModal };