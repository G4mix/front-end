import { SessionProvider } from "@components/SessionProvider";
import "../_styles/globals.css";
import React from "react";

export default function RootTemplate({ children }: { children: React.ReactNode; }) {
  return <SessionProvider>{children}</SessionProvider>

}