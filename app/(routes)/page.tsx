import { Navbar } from "@components/Navbar";
import styles from "./page.module.css";
import React from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
    </main>
  );
}
