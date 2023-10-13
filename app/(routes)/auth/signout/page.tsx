import { APIManager } from "@/app/_classes/APIManager";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export function Signout() {
  useEffect(() => {
    APIManager.signOut();
  }, []);
  return <div />;
}