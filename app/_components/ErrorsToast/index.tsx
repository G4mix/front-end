"use client";

import React, { type Dispatch, type SetStateAction, useEffect } from "react";
import { apiErrors } from "@constants/apiErrors";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import * as Toast from "@radix-ui/react-toast";
import styles from "./ErrorsToast.module.css";

type ErrorsToastProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  error: keyof typeof apiErrors;
  open: boolean;
}

export function ErrorsToast({ error, open, setOpen }: ErrorsToastProps) {
  useEffect(() => {
    setOpen(open);
    return () => {
      setOpen(false);
    };
  }, [open]);

  return (
    <Toast.Provider swipeDirection="down" duration={3000} label={`Error: ${error}`}>
      <Toast.Root className={styles.ToastRoot} open={open} onOpenChange={setOpen}>
        <Toast.Description className={styles.ToastDescription}>
          <Icon icon="sad" size="lg" style={{color: "var(--veronica)"}} />
          <Text size="xxs" align="justify">{apiErrors[error]}</Text>
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className={styles.ToastViewport} />
    </Toast.Provider>
  );
}