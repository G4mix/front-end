"use client";

import { icons } from "@constants/icons";
import { Text } from "@components/Text";
import { Icon } from "@components/Icon";
import React, { type Dispatch, type ReactNode, type SetStateAction } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import postFilterStyles from "../PostFilter.module.css";
import styles from "./PostFilterMenu.module.css";

type FilterDropdownProps = {
  children: ReactNode;
  options: { [option: string]: { name: string; icon: keyof typeof icons } };
  filterBy: string;
  setFilterBy: Dispatch<SetStateAction<string>>;
};

export const PostFilterDropdown = ({ children, options, filterBy, setFilterBy}: FilterDropdownProps) => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className={postFilterStyles.postFilterTrigger}>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={-1} side="bottom" align="center" className={styles.dropdownContent}>
          <DropdownMenu.RadioGroup className={styles.dropdownFilters} value={filterBy} onValueChange={setFilterBy}>
            {
              Object.keys(options)
                .filter(option => option !== filterBy)
                .map((option: string) => (
                  <DropdownMenu.RadioItem value={option} key={`option:${option}`} className={styles.dropdownItem} onSelect={e => e.preventDefault()}>
                    <Text size="sm">{options[option as keyof typeof options].name}</Text>
                    <Icon
                      icon={options[option as keyof typeof options].icon as keyof typeof icons}
                      className={postFilterStyles.dropdownIcon}
                    />
                  </DropdownMenu.RadioItem>
                ))
            }
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}