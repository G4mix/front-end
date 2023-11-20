import type { PostImageProps } from "..";
import styles from "../PostImage.module.css";
import Image from "next/image";
import React from "react";

type ThreeImagesProps = {
  handleOpenModal?: (selectedImage: string) => void;
} & PostImageProps;

export const ThreeImages = ({ images, title, handleOpenModal }: ThreeImagesProps) => {
  return (
    <div className={styles.postBoxImage} style={{flexDirection: "column"}}>
      <div className={styles.boxImage} style={{minHeight: "100%"}}>
        {
          images!.slice(0, 2).map((img) => (
            <Image
              src={img} key={`post:image:${img}`}
              width={500}  height={300}
              quality={100} alt={`Imagem do post: ${title!}`}
              className={styles.image}
              onClick={() => { if (handleOpenModal) handleOpenModal(img); }}
            />
          ))
        }
      </div>
      
      <Image
        src={images![2]} key={`post:image:${images![2]}`}
        width={500}  height={300}
        quality={100} alt={`Imagem do post: ${title!}`}
        className={styles.image}
        onClick={() => { if (handleOpenModal) handleOpenModal(images![2]); }}
      />
    </div>
  );
};