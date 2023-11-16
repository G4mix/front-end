import { NavbarUserProfile } from "./NavbarUserProfile";
import { Icon } from "@components/Icon";
import styles from "./Navbar.module.css";
import React from "react";
import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  position?: "bottom" | "top";
};

export const Navbar = ({ position="bottom" }: NavbarProps) => {
  return (
    <nav className={`${styles.nav} ${position === "top" ? styles.navTop : ""}`}>
      <div className={styles.navItems}>
        <Link href="/">
          <Icon icon="house" className={styles.navbarIcon} />
        </Link>
        <Icon icon="search" className={styles.navbarIcon} disabled />
        <Link href="/posts/create" aria-label="Página de criação de posts, projetos, etc..." className={styles.centerContainer}>
          <Image
            src={"/logo.svg"}
            width={50}
            height={50}
            alt="Gamix logo image"
            className={`${styles.createCenter} ${position === "top" ? styles.createCenterTop : ""}`}
          />
        </Link>
        <Icon icon="users" className={styles.navbarIcon} disabled />
        <NavbarUserProfile />
      </div>
    </nav>
  );
};
