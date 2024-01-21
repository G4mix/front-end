import { Loader } from "@components/Loader";
import { Text } from "@components/Text";
import React from "react";
import styles from "./CreatePostPosting.module.css";
import Image from "next/image";

type CreatePostPostingProps = {
  mode: "create" | "update";
  tryingToPost: boolean;
};

export const CreatePostPosting = ({ tryingToPost, mode }: CreatePostPostingProps) => {
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
        />
        <Text size="lg" weight="bold" asChild>
          <h2>{ mode === "update" ? "Atualizando" : "Publicando"}...</h2>
        </Text>
      </div>
      <Loader />
    </div>
  );
};