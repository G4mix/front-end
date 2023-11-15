import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { Icon } from "@components/Icon";
import styles from "./DuotoneUserIcon.module.css";
import React, { HtmlHTMLAttributes } from "react";

type RootProps = {
  className?: HtmlHTMLAttributes<HTMLDivElement>["className"];
  children: React.ReactNode;
};

const Root = ({ children, className=" " }: RootProps) => {
  return (
    <div className={`${styles.duotoneUserIcon} ${className}`}>
      {children}
    </div>
  );
};

type CircleProps = {
  className?: FontAwesomeIconProps["className"];
};

const Circle = ({ className=" " }: CircleProps) => {
  return (
    <Icon icon="circle" className={`${styles.circleIcon} ${className}`} />
  );
};

type UserCircleProps = {
  className?: FontAwesomeIconProps["className"];
};

const UserCircle = ({ className=" " }: UserCircleProps) => {
  return (
    <Icon icon="user-circle" className={`${styles.userCircleIcon} ${className}`} />
  );
};

export const DuotoneUserIcon = { Root, Circle, UserCircle };