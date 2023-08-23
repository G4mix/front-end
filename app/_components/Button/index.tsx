import React from "react";

interface ButtonProps {
  backgroundColor?: string;
  children: React.ReactNode;
}

export function Button({ children }: ButtonProps) {
  return (
    <button>{children}</button>
  );
}