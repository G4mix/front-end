import React, { forwardRef } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultChecked?: boolean;
}

const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(({ defaultChecked=false, ...props }, ref) => {
  return <input type="checkbox" className={styles.input} defaultChecked={defaultChecked} ref={ref} {...props} />;
});

CheckboxInput.displayName = "CheckboxInput";

export { CheckboxInput };