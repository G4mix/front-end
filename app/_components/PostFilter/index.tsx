"use client";

import { PostFilterDropdown } from "./PostFilterMenu";
import { icons } from "@constants/icons";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import React, { useState } from "react";
import styles from "./PostFilter.module.css";

type PostFilterProps = {
  options: { [option: string]: { name: string; icon: keyof typeof icons } };
};

export function PostFilter({ options }: PostFilterProps) {
  const [filterBy, setFilterBy] = useState<string>(Object.keys(options)[0]);

  return (
    <PostFilterDropdown options={options} filterBy={filterBy} setFilterBy={setFilterBy}>
      <div className={styles.filter}>
        <Text size="sm">{options[filterBy].name}</Text>
        <Icon icon="down" className={styles.dropdownIcon} />
      </div>
    </PostFilterDropdown>
  );
}