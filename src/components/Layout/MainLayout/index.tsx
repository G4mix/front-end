"use client";

import { ReactNode } from "react";
import { Sidebar } from "../Sidebar";
import { NotificationsPanel } from "../NotificationsPanel";
import styles from "./styles.module.css";
import { Messages } from "../Messages";

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
      className={styles.layoutContainer}
      style={{
        gridTemplateColumns: rightColumn ? "320px 1fr 436px" : "320px 1fr",
        paddingRight: rightColumn ? "0" : "2rem",
      }}
    >
      <div>
        <div className={styles.sidebarContainer}>
          <Sidebar />
        </div>
      </div>

      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>{children}</div>
      </main>

      {rightColumn && (
        <div>
          <div className={styles.rightContainer}>
            <NotificationsPanel />
            <Messages />
          </div>
        </div>
      )}
    </div>
  );
};
