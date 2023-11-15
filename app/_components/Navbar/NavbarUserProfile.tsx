"use client";

import { NavbarUserProfileDropdown } from "@components/Navbar/NavbarUserProfileDropdown";
import { NavbarUserProfileIcon } from "@components/Navbar/NavbarUserProfileIcon";
import { DuotoneUserIcon } from "@components/DuotoneUserIcon";
import { useSession } from "@functions/useSession";
import { Icon } from "@components/Icon";
import styles from "./Navbar.module.css";
import React from "react";

export const NavbarUserProfile = () => {
  const { session, status } = useSession();

  if (status !== "authenticated") {
    return (
      <NavbarUserProfileDropdown>
        <DuotoneUserIcon.Root className={styles.duotoneUserIcon}>
          <DuotoneUserIcon.Circle className={styles.circle} />
          <DuotoneUserIcon.UserCircle className={styles.userCircle} />
        </DuotoneUserIcon.Root>
      </NavbarUserProfileDropdown>
    );
  }

  return (
    <NavbarUserProfileDropdown>
      <NavbarUserProfileIcon session={session!} />
    </NavbarUserProfileDropdown>
  );
};