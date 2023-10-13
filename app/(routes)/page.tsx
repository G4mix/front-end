"use client";

import { useSession } from "@functions/useSession";
import { Heading } from "@components/Heading";
import { Navbar } from "@components/Navbar";
import styles from "./page.module.css";
import React from "react";

export default function Home() {
  const { session, status } = useSession();
  if (status === "loading" || !session) return <div>Loading...</div>;
  if (status === "unauthenticated") {
    return <div>Não autorizado.</div>;
  }

  return (
    <main className={styles.main}>
      <Navbar session={session} />
      <Heading>Bem-vindo: {session.username}</Heading>
    </main>
  );
}
