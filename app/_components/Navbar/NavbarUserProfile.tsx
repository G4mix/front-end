"use client";

import { NavbarUserProfileDropdown } from "@components/Navbar/NavbarUserProfileDropdown";
import { NavbarUserProfileIcon } from "@components/Navbar/NavbarUserProfileIcon";
import { useSession } from "@functions/useSession";
import { Icon } from "@components/Icon";
import React from "react";

export function NavbarUserProfile(): JSX.Element {
  const { session, status } = useSession();

  if (status !== "authenticated") {
    return (
      <NavbarUserProfileDropdown>
        <Icon icon="user-circle" size="3x" width={24} height={24} style={{color: "#626ca7"}} />
      </NavbarUserProfileDropdown>
    );
  }

  return (
    <NavbarUserProfileDropdown>
      <NavbarUserProfileIcon session={session!} />
    </NavbarUserProfileDropdown>
  );
}