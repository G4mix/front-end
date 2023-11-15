import styles from "./Checkbox.module.css";
import React from "react";

type CheckboxIndicatorContainerProps = {} & React.HTMLAttributes<HTMLDivElement>;

export const CheckboxIndicatorContainer = ({ children }: CheckboxIndicatorContainerProps) => {
  return <div className={styles.indicatorContainer}>{children}</div>;
};