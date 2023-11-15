"use client";

import React, { useCallback, useState, forwardRef, useImperativeHandle } from "react";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import * as ToastPrimitive from "@radix-ui/react-toast";
import styles from "./Toast.module.css";
import { icons } from "@/app/_constants/icons";

export type ToastHandlers = {
  showMessage: (message: string, iconToShow?: keyof typeof icons) => void;
};

const Toast = forwardRef<ToastHandlers>((_props, ref) => {
  const [message, setMessage] = useState("");
  const [icon, setIcon] = useState<keyof typeof icons>("sad");
  const [open, setOpen] = useState(false);

  const showMessage = useCallback((messageToShow: string = "", iconToShow: keyof typeof icons = "sad") => {
    if (message !== messageToShow) setMessage(messageToShow);
    if (iconToShow !== icon) setIcon(iconToShow);
    setOpen(true);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      showMessage
    };
  });

  return (
    <ToastPrimitive.Provider swipeDirection="down" duration={3000} label={`Houve um erro: ${message}`}>
      <ToastPrimitive.Root className={styles.ToastRoot} open={open} onOpenChange={setOpen}>
        <ToastPrimitive.Description className={styles.ToastDescription}>
          <Icon icon={icon} size="lg" style={{color: "var(--veronica)"}} />
          <Text size="xxs" align="justify">{message}</Text>
        </ToastPrimitive.Description>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport className={styles.ToastViewport} />
    </ToastPrimitive.Provider>
  );
});

Toast.displayName = "Toast";

export { Toast };