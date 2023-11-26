"use client";

import { NavbarUserProfileDropdown } from "./NavbarUserProfileDropdown";
import { NavbarUserProfileIcon } from "./NavbarUserProfileIcon";
import { DuotoneUserIcon } from "@components/DuotoneUserIcon";
import { useSession } from "@contexts/global/SessionContext";
import { Text } from "@components/Text";
import navStyles from "../Navbar.module.css";
import styles from "./NavbarUserProfile.module.css";
import React from "react";
import Link from "next/link";

export const NavbarUserProfile = () => {
  const { session } = useSession();

  if (!session) {
    return (
      <Link href="/auth/signin" aria-label="Conecte-se ao Gamix!">
        <DuotoneUserIcon.Root className={styles.duotoneUserIcon}>
          <DuotoneUserIcon.Circle className={styles.circle} />
          <DuotoneUserIcon.UserCircle className={styles.userCircle} />
        </DuotoneUserIcon.Root>
      </Link>
    );
  }

  return (
    <NavbarUserProfileDropdown>
      <div className={navStyles.navItem}>
        <NavbarUserProfileIcon session={session!} />
        <Text size="sm" className={navStyles.navText}>{session.username}</Text>
      </div>
    </NavbarUserProfileDropdown>
  );
};