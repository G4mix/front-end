import styles from "./CollapsableItem.module.css";
import React from "react";

interface CollapsableItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CollapsableItem = ({ children, ...props }: CollapsableItemsProps) => {
  return (
    <div {...props} className={styles.item}>
      {children}
    </div>
  );
};