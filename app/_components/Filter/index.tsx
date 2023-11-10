import { FilterDropdown } from "./FilterDropdown/FilterDropdown";
import { Icon } from "@components/Icon";
import styles from "./Filter.module.css";
import React from "react";

export function Filter() {
  return (
    <FilterDropdown>
      <div className={styles.filter}>
        <Icon icon="chart" className={styles.iconFilter} />
      </div>
    </FilterDropdown>
  );
}