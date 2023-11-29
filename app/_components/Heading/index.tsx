import { Slot } from "@radix-ui/react-slot";
import styles from "./Heading.module.css";
import React from "react";

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  weight?: "thin" | "light" | "regular" | "medium" | "bold" | "black";
  size?: "xxs" | "xs" | "sm" | "default" | "md" | "lg";
} & React.HTMLAttributes<HTMLParagraphElement>;

export const Heading = ({ children, asChild=false, size="default", weight="regular", className, ...props }: HeadingProps) => {
  const Component = asChild ? Slot : "h2";

  return (
    <Component
      {...props}
      className={`${styles[size as keyof typeof styles]} ${styles[weight as keyof typeof styles]} ${styles.white} ${className}`}
    >
      {children}
    </Component>
  );
};