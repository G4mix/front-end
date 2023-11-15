"use client";

import { DuotoneUserIcon } from "@components/DuotoneUserIcon";
import { Session } from "@components/SessionProvider/Session.types";
import styles from "./Navbar.module.css";
import Image from "next/image";
import React from "react";

type NavbarUserProfileIconProps = {
  session: Session;
};

export const NavbarUserProfileIcon = ({ session }: NavbarUserProfileIconProps) => {
  return (
    <>
      {
        session && session!.icon ? (
          <Image
            src={session!.icon || ""}
            width={24}
            height={24}
            alt={`Imagem do ${session!.username}`}
            className={styles.imgRounded}
          />
        ) : (
          <DuotoneUserIcon.Root className={styles.duotoneUserIcon}>
            <DuotoneUserIcon.Circle className={styles.circle} />
            <DuotoneUserIcon.UserCircle className={styles.userCircle} />
          </DuotoneUserIcon.Root>
        )
      }
    </>
  );
};