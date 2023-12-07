import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { Icon } from "@components/Icon";
import styles from "./DuotoneUserIcon.module.css";
import React, { HtmlHTMLAttributes } from "react";

type RootProps = {
  className?: HtmlHTMLAttributes<HTMLDivElement>["className"];
  children: React.ReactNode;
};

const Root = ({ children, className="" }: RootProps) => {
  return (
    <div className={`${styles.duotoneUserIcon} ${className}`}>
      {children}
    </div>
  );
};

type CircleProps = {
  className?: FontAwesomeIconProps["className"];
};

const Circle = ({ className="" }: CircleProps) => {
  return (
    <Icon icon="circle" className={`${styles.circleIcon} ${className}`} />
  );
};

type UserCircleProps = {
  loading?: boolean;
  className?: FontAwesomeIconProps["className"];
};

const UserCircle = ({ className="", loading=false }: UserCircleProps) => {
  return (
    <Icon icon="user-circle" className={`${styles.userCircleIcon} ${className}`} loading={loading} />
  );
};

export const DuotoneUserIcon = { Root, Circle, UserCircle };