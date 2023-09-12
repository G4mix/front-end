import { Slot } from "@radix-ui/react-slot";
import styles from "./Text.module.css";
import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  asChild?: boolean;
  weight?: "thin" | "light" | "regular" | "medium" | "bold" | "black";
  size?: "xs" | "sm" | "default" | "md" | "lg";
}

export function Text({ children, asChild=false, size="default", weight="regular", ...props }: TextProps) {
  const Component = asChild ? Slot : "p";

  return (
    <Component {...props} className={`${styles[size as keyof typeof styles]} ${styles[weight as keyof typeof styles]}`}>{children}</Component>
  );
}