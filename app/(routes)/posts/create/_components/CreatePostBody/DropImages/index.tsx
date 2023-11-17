import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import styles from "./DropImages.module.css";
import React from "react";

export const DropImages = () => {
  return (
    <div className={styles.dropImages}>
      <Icon icon="cloud-arrow-up" className={styles.dropImageIcon} />
      <Text size="md" weight="medium">Solte para enviar</Text>
    </div>
  );
};