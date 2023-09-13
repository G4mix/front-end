import styles from "./Navbar.module.css";
import { Icon } from "@components/Icon";
import React from "react";

interface NavbarProps {
  user: { name: string, email: string, icon: string };
}

export function Navbar({ user }: NavbarProps) {
  return (
    <nav className={styles.nav}>
      <Icon icon="house" width={20} height={20} />
      <Icon icon="search" width={20} height={20} disabled />
      <Icon icon="plus" width={20} height={20} disabled />
      <Icon icon="users" width={20} height={20} disabled />
      {
        user 
          ? <img src={user.icon} width={24} height={24} alt={`Imagem do ${user.name}`} className={styles.img} />
          : <Icon icon="user" width={20} height={20} />
      }
    </nav> 
  );
}