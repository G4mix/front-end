import type { PostImageProps } from "..";
import styles from "../PostImage.module.css";
import Image from "next/image";
import React from "react";

export const TwoImages = ({ images, title }: PostImageProps) => {
  return (
    <div className={styles.postBoxImage}>
      {
        images!.map((img) => (
          <Image
            key={`post:image:${img}`} src={img}
            width={500}  height={300}
            quality={100} alt={`Imagem do post: ${title!}`}
            className={styles.image} style={{width: "50%"}}
            // onClick={() => openModal(img)}
          />
        ))
      }
    </div>
  );
};