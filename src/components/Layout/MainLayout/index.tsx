"use client";

import { ReactNode } from "react";
import { Sidebar } from "../Sidebar";
import { NotificationsPanel } from "../NotificationsPanel";
import styles from "./styles.module.css";
import { Messages } from "../Messages";
import { BiChat } from "react-icons/bi";
import { FaBell } from "react-icons/fa6";

interface MainLayoutProps {
  children: ReactNode;
  rightColumn?: boolean;
}

export const MainLayout = ({
  children,
  rightColumn = true,
}: MainLayoutProps) => {
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
            <img src="/logo_name_mobile.png" alt="Gamix" />

            <div className={styles.mobileMenuBarButtons}>
              <button>
                <BiChat />
              </button>

              <button>
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
            <NotificationsPanel />
            <Messages />
          </div>
        </div>
      )}
    </div>
  );
};
