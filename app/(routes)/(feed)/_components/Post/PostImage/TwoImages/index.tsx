"use client";

import type { ImagesModalHandler } from "../PostImagesModal";
import type { PostImageProps } from "..";
import React, { forwardRef } from "react";
import styles from "../PostImage.module.css";
import Image from "next/image";

const TwoImages = forwardRef<ImagesModalHandler, PostImageProps>(({ images, title }, ref) => {
  return (
    <div className={styles.postBoxImage}>
      {
        images!.map((img) => (
          <Image
            key={`post:image:${img}`} src={img}
            width={500}  height={300}
            quality={100} alt={`Imagem do post: ${title!}`}
            className={styles.image} style={{width: "50%"}}
            onClick={() => ref!.current!.handleOpenModal(img)}
          />
        ))
      }
    </div>
  );
});

TwoImages.displayName = "TwoImages";

export { TwoImages };