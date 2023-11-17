"use client";

import { useCreatePostContext } from "@contexts/CreatePostContext";
import { Icon } from "@components/Icon";
import styles from "./ContentImages.module.css";
import React from "react";
import Image from "next/image";

export const ContentImages  = () => {
  const { images, handleUnselectImage } = useCreatePostContext();
  return (
    <>
      {
        images.map((img: { link: string; image: File }) => 
          <div key={img.image.name} className={styles.postContentImageRoot}>
            <Image
              src={img.link}
              alt={`Imagem ${img.image.name}`}
              width={294} height={156}
              className={styles.postContentImage}
            />
            <Icon icon="x" className={styles.postContentImageCancel} onClick={() => handleUnselectImage(img.image)} />
          </div>
        )
      }
    </>
  );
};