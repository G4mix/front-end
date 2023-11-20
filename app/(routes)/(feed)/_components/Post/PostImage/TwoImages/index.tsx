"use client";

import type { PostImageProps } from "..";
import React from "react";
import styles from "../PostImage.module.css";
import Image from "next/image";

type TwoImagesProps = {
  handleOpenModal?: (selectedImage: string) => void;
} & PostImageProps;

export const TwoImages = ({ images, title, handleOpenModal }: TwoImagesProps) => {
  return (
    <div className={styles.postBoxImage}>
      {
        images!.map((img) => (
          <Image
            key={`post:image:${img}`} src={img}
            width={500}  height={300}
            quality={100} alt={`Imagem do post: ${title!}`}
            className={styles.image} style={{width: "50%"}}
            onClick={() => { if (handleOpenModal) handleOpenModal(img); }}
          />
        ))
      }
    </div>
  );
};