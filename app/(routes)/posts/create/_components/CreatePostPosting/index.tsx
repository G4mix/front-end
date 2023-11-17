import { Heading } from "@components/Heading";
import { Loader } from "@components/Loader";
import React from "react";
import styles from "./CreatePostPosting.module.css";
import Image from "next/image";

export const CreatePostPosting = ({ tryingToPost }: { tryingToPost: boolean; }) => {
  if (!tryingToPost) return null;
  
  return (
    <div className={styles.createPostPosting}>
      <div className={styles.posting}>
        <Image
          src="/android-chrome-192x192.png"
          alt="Gamix logo"
          width={192}
          height={192}
          quality={100}
          className={styles.createPostPostingImage}
        />
        <Heading size="lg" weight="bold">Publicando...</Heading>
      </div>
      <Loader />
    </div>
  );
};