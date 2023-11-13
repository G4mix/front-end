"use client";

import React, { useCallback, useState, forwardRef, useImperativeHandle } from "react";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import * as Toast from "@radix-ui/react-toast";
import styles from "./ErrorsToast.module.css";

export type ErrorsToastHandlers = {
  showError: (errorMessage: string) => void;
};

const ErrorsToast = forwardRef<ErrorsToastHandlers>((_props, ref) => {
  const [errorToShow, setErrorToShow] = useState("");
  const [open, setOpen] = useState(false);

  const showError = useCallback((errorMessage: string) => {
    if (errorToShow !== errorMessage) setErrorToShow(errorMessage);
    setOpen(true);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      showError
    };
  });

  return (
    <Toast.Provider swipeDirection="down" duration={3000} label={`Houve um erro: ${errorToShow}`}>
      <Toast.Root className={styles.ToastRoot} open={open} onOpenChange={setOpen}>
        <Toast.Description className={styles.ToastDescription}>
          <Icon icon="sad" size="lg" style={{color: "var(--veronica)"}} />
          <Text size="xxs" align="justify">{errorToShow}</Text>
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className={styles.ToastViewport} />
    </Toast.Provider>
  );
});

ErrorsToast.displayName = "ErrorsToast";

export { ErrorsToast };