import { Slot } from "@radix-ui/react-slot";
import styles from "./Heading.module.css";
import React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  asChild?: boolean;
  weight?: "thin" | "light" | "regular" | "medium" | "bold" | "black";
  size?: "xxs" | "xs" | "sm" | "default" | "md" | "lg";
}

export function Heading({ children, asChild=false, size="default", weight="regular", ...props }: HeadingProps) {
  const Component = asChild ? Slot : "h2";

  return (
    <Component {...props} className={`${styles[size as keyof typeof styles]} ${styles[weight as keyof typeof styles]}`}>{children}</Component>
  );
}