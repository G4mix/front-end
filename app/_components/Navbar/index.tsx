import { NavbarUserProfile } from "./NavbarUserProfile";
import { Icon } from "@components/Icon";
import styles from "./Navbar.module.css";
import React from "react";
import Image from "next/image";

export function Navbar() {
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
        <NavbarUserProfile />
      </div>
    </nav>
  );
}
