import { FilterDropdown } from "./FilterDropdown";
import { Icon } from "@components/Icon";
import styles from "./Filter.module.css";
import React from "react";

type FilterProps = {
  handleFilterBy: (option: string) => void;
  filterBy: string;
  options: { [option: string]: string };
};

export const Filter = ({ options, filterBy, handleFilterBy }: FilterProps) => {
  return (
    <FilterDropdown options={options} filterBy={filterBy} handleFilterBy={handleFilterBy}>
      <div className={styles.filter}>
        <Icon icon="chart" className={styles.iconFilter} />
      </div>
    </FilterDropdown>
  );
};