import { Slot } from "@radix-ui/react-slot";
import styles from "./Heading.module.css";
import React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  asChild?: boolean;
  size?: "xs" | "sm" | "default" | "md" | "lg";
}

export function Heading({ children, asChild=false, size="default", ...props }: HeadingProps) {
  const Component = asChild ? Slot : "h2";

  return (
    <Component {...props} className={styles[size as keyof typeof styles]}>{children}</Component>
  );
}