"use client";

import { APIManager } from "@classes/APIManager";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function SignoutPage() {
  const router = useRouter();
  useEffect(() => {
    APIManager.signOut();
    router.push("/auth/signin");
  }, []);
  return <div />;
}