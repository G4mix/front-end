import { Navbar } from "@components/Navbar";
import styles from "./page.module.css";
import React from "react";
import { NavbarUserProfile } from "@/app/_components/Navbar/NavbarUserProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Posts } from "../../(feed)/_components/Posts";

export default function UsersPage() {
  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.userProfileContainer}>
        <div className={styles.coverPhoto} />

        <div className={styles.profileActions}>
          <button className={styles.button}>Editar</button>

          <NavbarUserProfile className={styles.profileInfo} sizeFixed />

          <span className={styles.rotate}>...</span>
        </div>

        <div className={styles.postsContainer}>
          <Posts />
        </div>
      </section>
    </main>
  );
}
