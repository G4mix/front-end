import type { PostImageProps } from "..";
import styles from "../PostImage.module.css";
import Image from "next/image";
import React from "react";

type ThreeImagesProps = {
  handleOpenModal?: (selectedImage: string) => void;
} & PostImageProps;

export const ThreeImages = ({ images, handleOpenModal }: ThreeImagesProps) => {
  return (
    <div className={styles.postBoxImage} style={{flexDirection: "column"}}>
      <div className={styles.boxImage} style={{minHeight: "100%"}}>
        {
          images!.slice(0, 2).map((img) => (
            <Image
              src={`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${img.src!}`} key={`post:image:${img.src}`}
              width={img.width}  height={img.height}
              quality={100} alt={`Imagem: ${img.name!}`}
              className={styles.image}
              onClick={() => { if (handleOpenModal) handleOpenModal(img.src!); }}
            />
          ))
        }
      </div>
      
      <Image
        src={`${process.env["NEXT_PUBLIC_BACK_END_BASE_URL"]}${images![2]!.src!}`} key={`post:image:${images![2]!.src}`}
        width={images![2]!.width!}  height={images![2]!.height}
        quality={100} alt={`Imagem ${images![2]!.name!}`}
        className={styles.image}
        onClick={() => { if (handleOpenModal) handleOpenModal(images![2]!.src!); }}
      />
    </div>
  );
};