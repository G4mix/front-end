import { Icon } from "@components/Icon";
import styles from "./Navbar.module.css";
import React from "react";
import Image from "next/image";

interface NavbarProps {
  session: {
    username: string | null;
    email: string | null;
    icon: string | null;
  };
}

export function Navbar({ session }: NavbarProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.navItems}>
        <Icon icon="house" size="3x" width={24} height={24} />
        <Icon icon="search" size="3x" width={24} height={24} disabled />
        <div className={styles.createCenter}>
          <Image
            src={"/logo.svg"}
            width={50}
            height={50}
            alt="Gamix logo image"
          />
        </div>
        <Icon icon="users" size="3x" width={24} height={24} disabled />
        {session && session.icon ? (
          <Image
            src={session.icon || ""}
            width={24}
            height={24}
            alt={`Imagem do ${session.username}`}
            className={styles.imgRounded}
          />
        ) : (
          <Icon icon="user-circle" size="3x" width={24} height={24} />
        )}
      </div>
    </nav>
  );
}
