import styles from "./Checkbox.module.css";
import React from "react";

interface CheckboxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultChecked?: boolean;
}

export const CheckboxInput = ({ defaultChecked=false, ...props }: CheckboxInputProps) => {
  return <input type="checkbox" className={styles.input} defaultChecked={defaultChecked} {...props} />;
};