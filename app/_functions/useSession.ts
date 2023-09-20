"use client";

import { SessionContext } from "@components/SessionProvider";
import React from "react";

export function useSession() {
  return React.useContext(SessionContext);
}