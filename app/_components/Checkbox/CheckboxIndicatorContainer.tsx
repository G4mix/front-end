import styles from "./Checkbox.module.css";
import React from "react";

interface CheckboxIndicatorContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CheckboxIndicatorContainer({ children }: CheckboxIndicatorContainerProps) {
  return <div className={styles.indicatorContainer}>{children}</div>;
}