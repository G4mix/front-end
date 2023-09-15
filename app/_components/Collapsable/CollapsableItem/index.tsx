import styles from "./CollapsableItem.module.css";
import React from "react";

interface CollapsableItemsProps {
  children: React.ReactNode;
}

export function CollapsableItem({ children }: CollapsableItemsProps) {
  return (
    <div className={styles.item}>{children}</div>
  );
}