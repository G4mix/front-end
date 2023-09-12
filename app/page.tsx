import { Button } from "@components/Button";
import { Icon } from "@components/Icon";
import styles from "./page.module.css";
import React from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <Button>Testando</Button>
      <Icon icon="google" height={24}/>
    </main>
  );
}
