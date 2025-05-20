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
          </Link>
        </li>
        <li className={styles.item}>
          <FaSearch className={`${styles.icon} ${styles.disabled}`} />
        </li>
        <li className={styles.item}>
          <Link href="/post/create">
            <FiPlusCircle className={styles.icon} />
          </Link>
        </li>
        <li className={styles.item}>
          <FaUsers className={`${styles.icon} ${styles.disabled}`} />
        </li>
        <li className={styles.item}>
          <FaUserCircle className={`${styles.icon} ${styles.disabled}`} />
        </li>
      </ul>
    </nav>
  );
};
