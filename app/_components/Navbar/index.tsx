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
        <div className={styles.centerContainer} />
        <Icon icon="users" className={styles.navbarIcon} disabled />
        <NavbarUserProfile />
      </div>
      <Link
        href="/posts/create"
        aria-label="Página de criação de posts, projetos, etc..."
        className={styles.createImagePosition}
      >
        <Image
          src={"/android-chrome-512x512.png"}
          width={300}
          height={300}
          quality={100}
          alt="Gamix logo image"
          className={`${styles.createImage} ${position === "top" ? styles.createImageTop : ""}`}
          priority
        />
      </Link>
    </nav>
  );
};
