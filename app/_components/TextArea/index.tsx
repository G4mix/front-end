"use client";

import React, { forwardRef, useCallback } from "react";
import styles from "./TextArea.module.css";

type TextAreaProps = {
  autoResize?: boolean;
  className?: string;
  maxSize?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  autoResize, maxSize, className, children, ...props
}, ref) => {
  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    if (ref && "current" in ref && ref.current) {
      if (autoResize) {
        ref.current.style.height = "auto";
        ref.current.style.height = `${ref.current.scrollHeight}px`;
      }
  
      const limitedValue = e.target.value.slice(0, maxSize);
      ref.current.value = limitedValue;
    }
  }, [autoResize, maxSize, ref]);

  return (
    <textarea
      className={`${styles.area} ${className ? className : ""}`}
      onChange={handleOnChange} ref={ref}
      
      {...props}
    >
      {children}
    </textarea>
  );
});

TextArea.displayName = "TextArea";

export { TextArea };