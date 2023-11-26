"use client";

import { NavbarUserProfileDropdown } from "./NavbarUserProfileDropdown";
import { NavbarUserProfileIcon } from "./NavbarUserProfileIcon";
import { DuotoneUserIcon } from "@components/DuotoneUserIcon";
import { useSession } from "@contexts/global/SessionContext";
import styles from "./NavbarUserProfile.module.css";
import React from "react";
import Link from "next/link";

export const NavbarUserProfile = () => {
  const { session, status } = useSession();

  if (status !== "authenticated") {
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
      <NavbarUserProfileIcon session={session!} />
    </NavbarUserProfileDropdown>
  );
};