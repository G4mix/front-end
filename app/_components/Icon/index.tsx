import { FontAwesomeIcon, type FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faUser, faLock, faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./Icon.module.css";
import React from "react";

type IconProps = {
  icon: "google" | "github" | "linkedin" | "user" | "check" | "lock";
}

export function Icon({ icon, ...props }: Omit<FontAwesomeIconProps, "icon"> & IconProps) {
  const icons = {
    "google": faGoogle,
    "github": faGithub,
    "linkedin": faLinkedin,
    "user": faUser,
    "check": faCheck,
    "lock": faLock
  };
  const IconToRender = icons[icon as keyof typeof icons];

  return <FontAwesomeIcon {...props} className={styles.icon} icon={IconToRender} />;
}