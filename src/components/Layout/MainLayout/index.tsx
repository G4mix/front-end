"use client";

import { ReactNode } from "react";
import { Sidebar } from "../Sidebar";
import { Notifications } from "../Notifications";
import styles from "./styles.module.css";
import { Messages } from "../Messages";
import { BiChat } from "react-icons/bi";
import { FaBell } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";

interface MainLayoutProps {
  children: ReactNode;
  rightColumn?: boolean;
}

export const MainLayout = ({
  children,
  rightColumn = true,
}: MainLayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isNotificationsPage = pathname.includes("/notifications");

  return (
    <div
      className={
        styles.layoutContainer +
        " " +
        (rightColumn ? styles.hasRightColumn : "")
      }
    >
      <div className={styles.sidebarContainerWrapper}>
        <div className={styles.sidebarContainer}>
          <div className={styles.mobileMenuBar}>
            <img
              src="/logo_name_mobile.png"
              alt="Gamix"
              onClick={() => router.push("/")}
            />

            <div className={styles.mobileMenuBarButtons}>
              <button onClick={() => router.push("/chat")}>
                <BiChat />
              </button>

              <button onClick={() => router.push("/notifications")}>
                <FaBell />
              </button>
            </div>
          </div>

          <Sidebar />
        </div>
      </div>

      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>{children}</div>
      </main>

      {rightColumn && (
        <div className={styles.rightColumnContainer}>
          <div className={styles.rightContainer}>
            {!isNotificationsPage && <Notifications />}
            <Messages />
          </div>
        </div>
      )}
    </div>
  );
};
