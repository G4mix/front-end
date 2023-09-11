import { Icon } from "@components/Icon";
import styles from "./page.module.css";
import React from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <p>Teste</p>
      <Icon icon="google" />
      <Icon icon="linkedin" />
      <Icon icon="github" />
      <Icon icon="user" />
      <Icon icon="lock" />
      <Icon icon="check" />
    </main>
  );
}
