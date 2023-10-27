import type { Metadata } from "next";
import { SessionProvider } from "@components/SessionProvider";
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
    <SessionProvider>
      <html lang="pt-BR">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" />
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}
