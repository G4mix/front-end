"use client";

import { useCreatePostContext } from "@contexts/CreatePostContext";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import styles from "./ContentLinks.module.css";
import Image from "next/image";
import React from "react";

export const ContentLinks = () => {
  const { handleRemoveLink } = useCreatePostContext();
  return (
    <div className={styles.link}>
      <Image
        src="https://flowgames.gg/wp-content/uploads/2023/10/TGA-2023-data-poster-1044x588.jpg"
        width={66}
        height={66}
        className={styles.linkImage}
        alt="Imagem The Game Awards"
      />
      <div className={styles.linkInformations}>
        <Text size="xs" weight="medium">The Game Awards</Text>
        <Text size="xs" weight="light" align="justify">Celebrate the best in video games and see whats next - Live from the Microsoft Theater in Los Angeles.</Text>
      </div>
      <Icon icon="x" className={styles.removeLink} onClick={() => handleRemoveLink("a")} />
    </div>
  );
};