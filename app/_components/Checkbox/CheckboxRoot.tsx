import styles from "./Checkbox.module.css";
import React from "react";

interface CheckboxRootProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
}

export const CheckboxRoot = ({ children, disabled=false, ...props }: CheckboxRootProps) => {
  return (
    <label {...props} className={`${styles.root} ${disabled ? styles["checkbox-disabled"] : ""}`}>
      {children}
    </label>
  );
}