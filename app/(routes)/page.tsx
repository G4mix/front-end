"use client";

import { useSession } from "@functions/useSession";
import { Navbar } from "@components/Navbar";
import styles from "./page.module.css";
import React from "react";
import { Heading } from "../_components/Heading";

export default function Home() {
  const { session, status } = useSession();
  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated" || !session) return <div>Não autorizado.</div>;

  return (
    <main className={styles.main}>
      <Navbar session={session} />
      <Heading>Bem-vindo: {session.username}</Heading>
    </main>
  );
}
