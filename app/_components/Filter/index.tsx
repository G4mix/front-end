import { FilterDropdown } from "./FilterDropdown";
import { Icon } from "@components/Icon";
import styles from "./Filter.module.css";
import React from "react";

type FilterProps = {
  handleFilterBy?: (option: string) => void;
  filterBy?: string;
  disabled?: boolean;
  options: { [option: string]: string };
};

export const Filter = ({ options, filterBy, handleFilterBy, disabled=false }: FilterProps) => {
  return (
    <FilterDropdown options={options} filterBy={filterBy} handleFilterBy={handleFilterBy} disabled={disabled}>
      <div className={styles.filter}>
        <Icon icon="chart" className={styles.iconFilter} />
      </div>
    </FilterDropdown>
  );
};