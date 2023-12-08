import { Icon } from "@/app/_components/Icon";
import localStyles from "./PostImageLoading.module.css";
import styles from "../PostImage.module.css";
import React from "react";

export const PostImageLoading = () => {
  return (
    <div className={`${styles.postBoxImage} ${localStyles.loading}`}>
      <Icon icon="image" loading className={localStyles.loadingIcon} />
    </div>
  );
};