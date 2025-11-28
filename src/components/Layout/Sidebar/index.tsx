"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import styles from "./styles.module.css";
import { FaHouse, FaPuzzlePiece } from "react-icons/fa6";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const menuItems = [
  { href: "/", icon: FaHouse, label: "Início" },
  { href: "/idea/create", icon: FiPlusCircle, label: "Criar Ideia" },
  { href: "/projects", icon: FaPuzzlePiece, label: "Projetos" },
  { href: "/profile", icon: FaUserCircle, label: "Minha Conta" },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <aside className={styles.sidebar}>
        <Image className={styles.logo} src="/logo_name.svg" alt="GAMIX" width={160} height={160} />

        <nav className={styles.nav}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
              >
                <Icon className={styles.icon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button onClick={handleLogout} className={styles.logoutButton}>
          <BiLogOut className={styles.icon} />
          <span>Sair</span>
        </button>
      </aside>

      <nav className={styles.mobileNav}>
        {menuItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.mobileNavItem} ${
                isActive ? styles.active : ""
              }`}
            >
              <Icon className={styles.icon} />
            </Link>
          );
        })}
      </nav>
    </>
  );
};
