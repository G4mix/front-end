import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import styles from "../PostCommands.module.css";
import React from "react";

export const PostCommandsLoading = () => {
  return (
    <div className={styles.postCommands}>
      <div className={styles.postCommand}>
        <Icon icon="like" size="lg" className={styles.postCommandIcon} loading />
        <Text size="xs" weight="regular" loading>200K</Text>
      </div>
      <div className={styles.postCommand}>
        <Icon icon="comments" size="lg" className={styles.postCommandIcon} loading />
        <Text size="xs" weight="regular" loading>200K</Text> 
      </div>
      <div className={`${styles.postCommand} ${styles.postCommandView}`}>
        <Icon icon="chart" size="lg" className={styles.postCommandIcon} loading />
        <Text size="xs" weight="regular" loading>1M</Text>
      </div>
      <Icon icon="share" size="lg" className={styles.shareIcon} loading />
    </div>
  );
};