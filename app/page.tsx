import { faMountainSun } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Icon } from "@components/Icon";
import styles from "./page.module.css";
import React from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <p>Teste</p>
      <Icon.FontAwesome icon={faMountainSun} />
      <Icon.FontAwesome icon={faGoogle} />
      <Icon.Hero icon={"AcademicCapIcon"} />
    </main>
  );
}
