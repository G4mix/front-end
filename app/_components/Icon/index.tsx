import { FontAwesomeIcon, type FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { icons } from "@constants/icons";
import styles from "./Icon.module.css";
import React, { memo } from "react";

type IconProps = {
  className?: FontAwesomeIconProps["className"];
  disabled?: boolean;
  withoutClick?: boolean;
  loading?: boolean;
  icon: keyof typeof icons;
};

const Icon = memo(({
  icon, disabled=false, style, loading=false,
  withoutClick=false, className="", ...props
}: Omit<FontAwesomeIconProps, "icon"> & IconProps) => {
  const IconToRender = icons[icon as keyof typeof icons];
  return (
    <FontAwesomeIcon
      {...props}
      icon={IconToRender}
      className={`${styles.icon} ${disabled ? styles.disabled : ""} ${withoutClick ? styles.withoutClick : ""} ${className} ${loading ? styles.loading : ""}`}
      style={style}
    />
  );
});

Icon.displayName = "Icon";

export { Icon };