import { Text } from "@components/Text";
import { Icon } from "@components/Icon";
import localStyles from "./PostLinkLoading.module.css";
import styles from "../PostLinks.module.css";
import React from "react";

export const PostLinkLoading = () => {
  return (
    <div className={styles.link}>
      <div className={styles.linkImage}>
        <Icon icon="image" style={{width: "60px", height: "60px"}} loading />
      </div>
      <div className={styles.linkInformations}>
        <Text size="xs" weight="medium" loading>Loading{"_".repeat(13)}</Text>
        <div className={localStyles.lines}>
          <Text size="xs" weight="light" align="justify" loading>Loading{"_".repeat(15)}</Text>
          <Text size="xs" weight="light" align="justify" loading style={{width: "max-content"}}>Loading{"_".repeat(13)}</Text>
        </div>
      </div>
    </div>
  );
};