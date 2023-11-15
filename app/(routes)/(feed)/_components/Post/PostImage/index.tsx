import React from "react";
import Image from "next/image";
import styles from "./PostImage.module.css";

type PostImageProps = {
  image: string | null;
};

export const PostImage = ({ image }: PostImageProps) => {
  return (
    <div className={styles.postBoxImage}>
      <Image src={image || ""} width={380} height={200} alt="" />
    </div>
  );
};