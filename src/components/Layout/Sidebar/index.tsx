"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MdHome } from "react-icons/md";
import { FaSearch, FaUsers, FaUserCircle } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { BsFillChatDotsFill } from "react-icons/bs";
import styles from "./styles.module.css";
import { FaPuzzlePiece } from "react-icons/fa6";

const menuItems = [
  { href: "/", icon: MdHome, label: "Início" },
  { href: "/search", icon: FaSearch, label: "Pesquisar" },
  { href: "/idea/create", icon: FiPlusCircle, label: "Criar Ideia" },
  { href: "/projects", icon: FaPuzzlePiece , label: "Projetos" },
  { href: "/profile", icon: FaUserCircle, label: "Minha Conta" },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <aside className={styles.sidebar}>
        <img className={styles.logo} src="/logo_name.svg" alt="GAMIX" />

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
      </aside>

      {/* Mobile Bottom Navigation */}
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
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};
