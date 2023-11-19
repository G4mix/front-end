import type { PostImageProps } from "..";
import styles from "../PostImage.module.css";
import Image from "next/image";
import React from "react";

export const SingleImage = ({ images, title }: PostImageProps) => {
  return (
    <div className={styles.postBoxImage}>
      <Image
        src={images![0]!} 
        width={500} height={300}
        quality={100} alt={`Imagem do post: ${title!}`}
        className={styles.image}
      />
    </div>
  );
};