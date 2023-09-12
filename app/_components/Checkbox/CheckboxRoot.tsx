import { LabelHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxRootProps extends LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean;
};

export function CheckboxRoot({ children, disabled=false, ...props }: CheckboxRootProps) {
  return (
    <label {...props} className={`${styles.root} ${disabled ? styles["checkbox-disabled"] : ""}`}>
      {children}
    </label>
  );
}