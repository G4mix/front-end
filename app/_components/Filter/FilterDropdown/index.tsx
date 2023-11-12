"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { ReactNode, useState } from "react";
import styles from "./FilterDropdown.module.css";
import { Text } from "@components/Text";
import { Icon } from "@components/Icon";

type FilterDropdownProps = {
  children: ReactNode;
  options: { [option: string]: string };
};

export const FilterDropdown = ({ children, options }: FilterDropdownProps) => {
  const [filterBy, setFilterBy] = useState<string>(Object.keys(options)[0]);

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={5} side="bottom" align="end">
          <DropdownMenu.RadioGroup className={styles.dropdownFilters} value={filterBy} onValueChange={setFilterBy}>
            {
              Object.keys(options).map((option: string) => (
                <DropdownMenu.RadioItem value={option} key={`option:${option}`} className={styles.dropdownItem} onSelect={e => e.preventDefault()}>
                  <Icon
                    icon="circle"
                    className={filterBy === option ? styles.dropdownSelectedCircleIcon : styles.dropdownCircleIcon}
                  />
                  <Text>{options[option as keyof typeof options]}</Text>
                </DropdownMenu.RadioItem>
              ))
            }
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}