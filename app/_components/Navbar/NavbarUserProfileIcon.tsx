"use client";

import { Session } from "@components/SessionProvider/Session.types";
import { Icon } from "@components/Icon";
import styles from "./Navbar.module.css";
import Image from "next/image";
import React from "react";

type NavbarUserProfileIconProps = {
  session: Session;
}

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
          <Icon icon="user-circle" size="3x" width={24} height={24} style={{color: "#626ca7"}} />
        )
      }
    </>
  );
};