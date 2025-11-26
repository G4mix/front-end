"use client";

import { useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import styles from "./styles.module.css";

export const SearchScreen = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className={styles.searchScreen}>
      <div className={styles.header}>
        <FaSearch className={styles.icon} />
        <h1>Buscar</h1>
      </div>

      {query && (
        <div className={styles.searchInfo}>
          <p>Resultados para: <strong>{query}</strong></p>
        </div>
      )}

      <div className={styles.empty}>
        <FaSearch className={styles.emptyIcon} />
        <p>Funcionalidade de busca em desenvolvimento</p>
      </div>
    </div>
  );
};

