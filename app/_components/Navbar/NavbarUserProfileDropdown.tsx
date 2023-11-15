"use client";

import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./Navbar.module.css";
import React, { ReactNode } from "react";
import Link from "next/link";

type NavbarUserProfileDropdownProps = {
  children: ReactNode;
};

export const NavbarUserProfileDropdown = ({ children }: NavbarUserProfileDropdownProps) => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.dropdownMenuContent} sideOffset={5} side="top" align="end">
          <DropdownMenu.Item className={styles.dropdownMenuItem} asChild>
            <Link href="/auth/signout">
              <Icon icon="logout" size="2x" width={24} height={24} style={{opacity: "1"}} />
              <Text size="xxs">Logout</Text>
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};