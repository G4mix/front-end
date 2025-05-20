import { MdHome } from "react-icons/md";
import styles from "./style.module.css";
import { FiPlusCircle } from "react-icons/fi";
import { FaUsers } from "react-icons/fa6";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className={`${styles.navbar} navbar`}>
      <ul className={styles.navItems}>
        <li className={styles.item}>
          <Link href="/">
            <MdHome className={`${styles.icon} ${styles.active}`} />
            <span className={styles.navCaption}>Feed</span>
          </Link>
        </li>
        <li className={styles.item}>
          <FaSearch className={`${styles.icon} ${styles.disabled}`} />
          <span className={styles.navCaption}>Pesquisar</span>
        </li>
        <li className={styles.item}>
          <Link href="/post/create">
            <FiPlusCircle className={styles.icon} />
            <span className={styles.navCaption}>Criar postagem</span>
          </Link>
        </li>
        <li className={styles.item}>
          <FaUsers className={`${styles.icon} ${styles.disabled}`} />
          <span className={styles.navCaption}>Usuarios</span>
        </li>
        <li className={styles.item}>
          <FaUserCircle className={`${styles.icon} ${styles.disabled}`} />
          <span className={styles.navCaption}>Meu perfil</span>
        </li>
      </ul>
    </nav>
  );
};
