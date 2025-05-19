import { MdHome } from "react-icons/md";
import styles from "./style.module.css";
import { FiPlusCircle } from "react-icons/fi";
import { FaUsers } from "react-icons/fa6";
import { FaSearch, FaUserCircle } from "react-icons/fa";

export const Navbar = () => {
  return (
    <nav className={`${styles.navbar} navbar`}>
      <ul className={styles.navItems}>
        <li className={styles.item}>
          <MdHome className={`${styles.icon} ${styles.active}`} />
        </li>
        <li className={styles.item}>
          <FaSearch className={`${styles.icon} ${styles.disabled}`} />
        </li>
        <li className={styles.item}>
          <FiPlusCircle className={styles.icon} />
        </li>
        <li className={styles.item}>
          <FaUsers className={`${styles.icon} ${styles.disabled}`} />
        </li>
        <li className={styles.item}>
          <FaUserCircle className={styles.icon} />
        </li>
      </ul>
    </nav>
  );
};
