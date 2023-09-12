import { FontAwesomeIcon, type FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { icons } from "@constants/icons";
import styles from "./Icon.module.css";
import React from "react";

type IconProps = {
  className?: FontAwesomeIconProps["className"];
  icon: "google" | "github" | "linkedin" | "user" | "check" | "lock";
}

export function Icon({ icon, ...props }: Omit<FontAwesomeIconProps, "icon"> & IconProps) {
  const IconToRender = icons[icon as keyof typeof icons];
  return <FontAwesomeIcon {...props} icon={IconToRender} className={styles.icon} />;
}