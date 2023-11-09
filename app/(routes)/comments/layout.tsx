import type { Metadata } from "next";
import { SessionProvider } from "@components/SessionProvider";
import React from "react";
import "@styles/globals.css";

export const metadata: Metadata = {
  title: "Gamix · Comentários",
  description: "Comentários do post: ..."
};

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>{children}</SessionProvider>
  );
}
