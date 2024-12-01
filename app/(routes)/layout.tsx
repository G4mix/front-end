import type { Metadata } from "next";
import { MessagesProvider } from "@contexts/global/MessagesContext";
import { SessionContextProvider } from "@contexts/global/SessionContext";
import React from "react";
import "@styles/globals.css";

export const metadata: Metadata = {
  title: "Gamix · Home",
  description: "Bem-vindo ao ....."
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <MessagesProvider>
          <SessionContextProvider>
            {children}
          </SessionContextProvider>
        </MessagesProvider>
      </body>
    </html>
  );
}
