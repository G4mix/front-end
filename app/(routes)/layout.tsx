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
        <head>
          <script src="http://localhost:8097"></script>
        </head>
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}
