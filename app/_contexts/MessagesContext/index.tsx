"use client";

import type { icons } from "@constants/icons";
import { Toast, type ToastHandlers } from "@components/Toast";
import React, { createContext, useRef, useCallback } from "react";

export type MessagesContextProps = {
  handleShowMessage: (message: string, icon?: keyof typeof icons) => void;
};

export const MessagesContext = createContext<MessagesContextProps>({
  handleShowMessage: () => null
});

type SessionProviderProps = {
  children: React.ReactNode;
};

export const MessagesProvider = ({ children }: SessionProviderProps) => {
  const toastRef = useRef<ToastHandlers>(null);

  const handleShowMessage = useCallback((message: string, icon?: keyof typeof icons) => {
    toastRef.current?.showMessage(message, icon);
  }, []);

  return (
    <MessagesContext.Provider value={{ handleShowMessage }}>
      <Toast ref={toastRef} />
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessagesContext = (): MessagesContextProps => {
  return React.useContext(MessagesContext);
};
