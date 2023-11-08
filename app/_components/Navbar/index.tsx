import type { Session } from "@components/SessionProvider/Session.types";
import { NavbarUserProfile } from "./NavbarUserProfile";
import { Icon } from "@components/Icon";
import { Text } from "@components/Text";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./Navbar.module.css";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  session: Omit<Session, "accessToken">;
}

export function Navbar({ session }: NavbarProps) {
  return (
    <nav className={styles.nav}>
      <div className={styles.navItems}>
        <Icon icon="house" size="3x" width={24} height={24} />
        <Icon icon="search" size="3x" width={24} height={24} disabled />
        <div className={styles.createCenter}>
          <Image
            src={"/logo.svg"}
            width={50}
            height={50}
            alt="Gamix logo image"
          />
        </div>
        <Icon icon="users" size="3x" width={24} height={24} disabled />
        <DropdownMenu.Root modal={false}>
          <DropdownMenu.Trigger>
            <NavbarUserProfile session={session} />
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
      </div>
    </nav>
  );
}
