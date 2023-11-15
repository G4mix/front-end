"use client";

import { PostFilterDropdown } from "./PostFilterDropdown";
import { icons } from "@constants/icons";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import React, { useEffect } from "react";
import styles from "./PostFilter.module.css";
import { usePostsContext } from "../PostsProvider";

type PostFilterProps = {
  options: { [option: string]: { name: string; icon: keyof typeof icons } };
};

export const PostFilter = ({ options }: PostFilterProps) => {
  const { filterBy, handleFilterBy } = usePostsContext();

  useEffect(() => {
    handleFilterBy(Object.keys(options)[0] as "recent" | "highlights" | "following");
  }, []);

  return (
    <PostFilterDropdown options={options} filterBy={filterBy} handleFilterBy={handleFilterBy}>
      <div className={styles.filter}>
        <Text size="sm">{options[filterBy].name}</Text>
        <Icon icon="down" className={styles.dropdownIcon} />
      </div>
    </PostFilterDropdown>
  );
};