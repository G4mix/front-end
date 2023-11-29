import React from "react";
import styles from "./OptionsDiv.module.css";

type OptionsDivProps = {
  isShowingOption: boolean;
  children: React.ReactNode;
};

export const OptionsDiv = ({ children, isShowingOption }: OptionsDivProps) => {
  return (
    <div className={`${styles.options} ${isShowingOption ? styles.showingOption : ""}`}>
      {children}
    </div>
  );
};