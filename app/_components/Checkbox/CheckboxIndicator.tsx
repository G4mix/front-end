import styles from "./Checkbox.module.css";
import React from "react";
interface CheckboxIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function CheckboxIndicator({ children }: CheckboxIndicatorProps) {
  return <span className={styles.indicator}>{children}</span>;
}