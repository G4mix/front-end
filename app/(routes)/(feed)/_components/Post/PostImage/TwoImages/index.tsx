"use client";

import type { PostImageProps } from "..";
import React from "react";
import styles from "../PostImage.module.css";
import Image from "next/image";

type TwoImagesProps = {
  handleOpenModal?: (selectedImage: string) => void;
} & PostImageProps;

export const TwoImages = ({ images, handleOpenModal }: TwoImagesProps) => {
  return (
    <div className={styles.postBoxImage}>
      {
        images!.map((img) => (
          <Image
            key={`post:image:${img.src}`} src={`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${img.src!}`}
            width={img.width!}  height={img.height!}
            quality={100} alt={`Imagem: ${img.name!}`}
            className={styles.image} style={{width: "50%"}}
            onClick={() => { if (handleOpenModal) handleOpenModal(img.src!); }}
          />
        ))
      }
    </div>
  );
};