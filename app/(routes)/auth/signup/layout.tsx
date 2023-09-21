import type { Metadata } from "next";
import React from "react";
import "../../../_styles/globals.css";

export const metadata: Metadata = {
  title: "Gamix · Registro",
  description: "Bem-vindo ao ....."
};

export default function Layout({
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
