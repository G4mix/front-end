import { Text } from "@components/Text";
import styles from "./Answer.module.css";
import React from "react";
import { Icon } from "@components/Icon";

export function Answer() {
  return (
    <div className={styles.answer}>
      <div className={styles.emojisSide}>
        <Icon icon="smile" />
        <Text size="md">Responder</Text>
      </div>
      <div className={styles.sendIconBox}>
        <Icon icon="paper-plane" />
      </div>
    </div>
  );
}