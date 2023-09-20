import type { Metadata } from "next";
import React from "react";
import "../../../_styles/globals.css";

export const metadata: Metadata = {
  title: "Gamix · Login",
  description: "Bem-vindo ao ....."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
