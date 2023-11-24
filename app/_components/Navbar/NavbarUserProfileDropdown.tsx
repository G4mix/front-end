"use client";

import { useSession } from "@contexts/global/SessionContext";
import { useRouter } from "next/navigation";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import React, { ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./Navbar.module.css";

type NavbarUserProfileDropdownProps = {
  children: ReactNode;
};

export const NavbarUserProfileDropdown = ({ children }: NavbarUserProfileDropdownProps) => {
  const { setUnauthenticated } = useSession();
  const router = useRouter();

  const handleSignout = () => {
    setUnauthenticated();
    router.push("/auth/signin");
  };

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.dropdownMenuContent} sideOffset={5} side="top" align="end">
          <DropdownMenu.Item className={styles.dropdownMenuItem} onClick={handleSignout}>
            <Icon icon="logout" size="2x" width={24} height={24} style={{opacity: "1"}} />
            <Text size="xxs">Logout</Text>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};