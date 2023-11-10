import { FilterDropdown } from "./FilterDropdown";
import { Icon } from "@components/Icon";
import styles from "./Filter.module.css";
import React from "react";

type FilterProps = {
  options: { [option: string]: string };
};

export function Filter({ options }: FilterProps) {
  return (
    <FilterDropdown options={options}>
      <div className={styles.filter}>
        <Icon icon="chart" className={styles.iconFilter} />
      </div>
    </FilterDropdown>
  );
}