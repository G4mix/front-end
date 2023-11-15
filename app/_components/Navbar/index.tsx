import { NavbarUserProfile } from "./NavbarUserProfile";
import { Icon } from "@components/Icon";
import styles from "./Navbar.module.css";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.navItems}>
        <Icon icon="house" className={styles.navbarIcon} />
        <Icon icon="search" className={styles.navbarIcon} disabled />
        <Link href="/create" aria-label="Página de criação de posts, projetos, etc..." className={styles.centerContainer}>
          <Image
            src={"/logo.svg"}
            width={50}
            height={50}
            alt="Gamix logo image"
            className={styles.createCenter}
          />
        </Link>
        <Icon icon="users" className={styles.navbarIcon} disabled />
        <NavbarUserProfile />
      </div>
    </nav>
  );
};
