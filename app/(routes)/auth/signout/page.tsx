import { APIManager } from "@/app/_classes/APIManager";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export function Signout() {
  const router = useRouter();
  useEffect(() => {
    APIManager.signOut();
    router.push("/auth/signin");
  }, []);
  return <div />;
}