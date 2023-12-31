import { CommentsProvider } from "@contexts/post/CommentsContext";
import type { Metadata } from "next";
import React from "react";
import "@styles/globals.css";

export const metadata: Metadata = {
  title: "Gamix · Posts",
  description: "Bem-vindo ao ....."
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CommentsProvider>{children}</CommentsProvider>
  );
}
