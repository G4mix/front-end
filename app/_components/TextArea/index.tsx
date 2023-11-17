"use client";

import React, { forwardRef, useCallback } from "react";
import styles from "./TextArea.module.css";

type TextAreaProps = {
  autoResize?: boolean;
  className?: string;
  maxSize?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  autoResize, maxSize, className, children, rows, ...props
}, ref) => {
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (ref && "current" in ref && ref.current) {
        ref.current.style.height = "auto";
        ref.current.style.height = `${ref.current.scrollHeight}px`;
      } else if (e) {
        e.currentTarget.style.height = "auto";
        e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
      }
    },
    [ref]
  );

  return (
    <textarea
      className={`${styles.area} ${className ? className : ""}`}
      onChange={handleOnChange} ref={ref} rows={rows || 1}
      {...props}
    >
      {children}
    </textarea>
  );
});

TextArea.displayName = "TextArea";

export { TextArea };