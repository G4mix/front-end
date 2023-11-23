import type { PostImageProps } from "..";
import styles from "../PostImage.module.css";
import Image from "next/image";
import React from "react";
import { SingleImageModal } from "../SingleImageModal";

export const SingleImage = ({ images }: PostImageProps) => {
  return (
    <div className={styles.postBoxImage}>
      <SingleImageModal image={images![0]}>
        <Image
          src={`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${images![0]!.src!}`} 
          width={images![0]!.width} height={images![0]!.height}
          quality={100} alt={`Imagem: ${images![0]!.name}`}
          className={styles.image}
        />
      </SingleImageModal>
    </div>
  );
};