import { Content, CollapsibleContentProps } from "@radix-ui/react-collapsible";
import styles from "./CollapsableContent.module.css";
import React from "react";

export function CollapsableContent({ ...props }: CollapsibleContentProps) {
  return <Content {...props} className={styles.content} />;
}