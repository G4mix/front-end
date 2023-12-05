import { NavbarUserProfile } from "./NavbarUserProfile";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import styles from "./Navbar.module.css";
import React from "react";
import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  withoutMobile?: boolean;
  position?: "bottom" | "top";
};

export const Navbar = ({ position="bottom", withoutMobile=false }: NavbarProps) => {
  return (
    <nav className={`${styles.nav} ${position === "top" ? styles.navTop : ""} ${withoutMobile ? styles.withoutMobile : ""}`}>
      <div className={styles.navItems}>
        <Link href="/" className={styles.navItem}>
          <Icon icon="house" className={styles.navbarIcon} />
          <Text size="sm" className={styles.navText}>Início</Text>
        </Link>
        <div className={styles.navItem}>
          <Icon icon="search" className={styles.navbarIcon} disabled />
          <Text size="sm" className={styles.navText}>Pesquisar</Text>
        </div>
        <div className={styles.centerContainer} />
        <div className={styles.navItem}>
          <Icon icon="users" className={styles.navbarIcon} disabled />
          <Text size="sm" className={styles.navText}>Equipes</Text>
        </div>
        <NavbarUserProfile />
      </div>
      <Link
        href="/posts/create"
        aria-label="Página de criação de posts, projetos, etc..."
        className={`${styles.createImagePosition} ${position === "top" ? styles.createImageTop : ""}`}
      >
        <Image
          src={"/android-chrome-512x512.png"}
          width={300}
          height={300}
          quality={100}
          alt="Gamix logo image"
          className={styles.createImage}
          priority
        />
      </Link>
    </nav>
  );
};
