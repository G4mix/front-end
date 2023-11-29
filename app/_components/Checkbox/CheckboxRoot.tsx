import styles from "./Checkbox.module.css";
import React from "react";

type CheckboxRootProps = {
  disabled?: boolean;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export const CheckboxRoot = ({ children, disabled=false, ...props }: CheckboxRootProps) => {
  return (
    <label {...props} className={`${styles.root} ${disabled ? styles["checkbox-disabled"] : ""}`}>
      {children}
    </label>
  );
};