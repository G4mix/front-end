import React from "react";
import Image from "next/image";
import styles from "./PostBox.module.css";

interface PostImageProps {
  image: string | null;
}

function PostImage({ image }: PostImageProps) {
  return (
    <div className={styles.PostBoxImage}>
      <Image src={image || ""} width={380} height={200} alt="" />
    </div>
  );
}

export default PostImage;
