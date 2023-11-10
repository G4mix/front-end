"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { ReactNode, useState } from "react";
import styles from "./FilterDropdown.module.css";
import { Text } from "@components/Text";
import { Icon } from "@components/Icon";

type FilterDropdownProps = {
  children: ReactNode;
}

export function FilterDropdown({ children }: FilterDropdownProps) {
  const [filterBy, setFilterBy] = useState<string>("recent");
  
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={5} side="bottom" align="end" onCloseAutoFocus={() => console.log("close")}>
          <DropdownMenu.RadioGroup className={styles.dropdownFilters} value={filterBy} onValueChange={setFilterBy}>
            <DropdownMenu.RadioItem value="recent" className={styles.dropdownItem}>
              <Icon
                icon="circle"
                className={filterBy === "recent" ? styles.dropdownSelectedCircleIcon : styles.dropdownCircleIcon}
              />
              <Text>Recentes</Text>
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="relevant" className={styles.dropdownItem}>
              <Icon
                icon="circle"
                className={filterBy === "relevant" ? styles.dropdownSelectedCircleIcon : styles.dropdownCircleIcon}
              />
              <Text>Relevantes</Text>
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="all" className={styles.dropdownItem}>
              <Icon
                icon="circle"
                className={filterBy === "all" ? styles.dropdownSelectedCircleIcon : styles.dropdownCircleIcon}
              />
              <Text>Todos</Text>
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}