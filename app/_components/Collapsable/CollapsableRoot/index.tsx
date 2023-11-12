import { Root, CollapsibleProps } from "@radix-ui/react-collapsible";
import styles from "./CollapsableRoot.module.css";
import React from "react";

export const CollapsableRoot = ({ ...props }: CollapsibleProps) => {
  return <Root {...props} className={styles.root} />;
};