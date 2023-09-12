import { Slot } from "@radix-ui/react-slot";
import styles from "./Text.module.css";
import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  asChild?: boolean;
  size?: "xs" | "sm" | "default" | "md" | "lg";
}

export function Text({ children, asChild=false, size="default", ...props }: TextProps) {
  const Component = asChild ? Slot : "p";

  return (
    <Component {...props} className={styles[size as keyof typeof styles]}>{children}</Component>
  );
}