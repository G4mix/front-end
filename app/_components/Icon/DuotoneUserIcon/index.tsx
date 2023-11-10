import { Icon } from "@components/Icon";
import styles from "./DuotoneUserIcon.module.css";
import React from "react";

export function DuotoneUserIcon() {
  return (
    <div className={styles.duotoneUserIcon}>
      <Icon icon="circle" className={styles.circleIcon} />
      <Icon icon="user-circle" className={styles.userCircleIcon} />
    </div>
  );
}