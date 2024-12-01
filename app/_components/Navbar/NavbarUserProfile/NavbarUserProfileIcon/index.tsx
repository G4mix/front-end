import { DuotoneUserIcon } from "@components/DuotoneUserIcon";
import { Session } from "@contexts/global/SessionContext/Session.types";
import styles from "../NavbarUserProfile.module.css";
import Image from "next/image";
import React from "react";

type NavbarUserProfileIconProps = {
  session: Session;
  sizeFixed?: boolean;
};

export const NavbarUserProfileIcon = ({
  session,
  sizeFixed,
}: NavbarUserProfileIconProps) => {
  return (
    <>
      {session && session!.icon ? (
        <Image
          src={session!.icon || ""}
          width={sizeFixed ? 80 : undefined}
          height={sizeFixed ? 80 : undefined}
          alt={`Imagem do ${session!.username}`}
          className={styles.imgRounded}
        />
      ) : (
        <DuotoneUserIcon.Root className={sizeFixed ? styles.fixedDuotoneUserIcon : styles.duotoneUserIcon}>
          <DuotoneUserIcon.Circle className={sizeFixed ? styles.fixedCircle : styles.circle} />
          <DuotoneUserIcon.UserCircle className={sizeFixed ? styles.fixedUserCircle : styles.userCircle} />
        </DuotoneUserIcon.Root>
      )}
    </>
  );
};
