import { FontAwesomeIcon, type FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { icons } from "@constants/icons";
import styles from "./Icon.module.css";
import React from "react";

type IconProps = {
  className?: FontAwesomeIconProps["className"];
  disabled?: boolean;
  withoutClick?: boolean;
  icon: keyof typeof icons;
};

export const Icon = ({
  icon, disabled=false, style,
   withoutClick=false, className=undefined, ...props
}: Omit<FontAwesomeIconProps, "icon"> & IconProps) => {
  const IconToRender = icons[icon as keyof typeof icons];
  return (
    <FontAwesomeIcon
      {...props}
      icon={IconToRender}
      className={`${styles.icon} ${disabled ? styles.disabled : ""} ${withoutClick ? styles.withoutClick : ""} ${className ? className : ""}`}
      style={style}
    />
  );
}