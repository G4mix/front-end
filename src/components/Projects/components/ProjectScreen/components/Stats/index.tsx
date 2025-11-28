import { FaUserFriends } from "react-icons/fa";
import styles from "./styles.module.css";
import { IProject } from "@/interfaces/project";
import Image from "next/image";

interface StatsProps {
  project: IProject;
}

export const Stats = ({ project }: StatsProps) => {
  return (
    <div className={styles.stats}>
      <div className={styles.stat}>
        <Image
          src="/icons/lightbulb_primary.svg"
          alt="Ideias"
          width={24}
          height={24}
        />
        <span className={styles.statValue}>
          <strong>{project.ideasCount}</strong> ideias
        </span>
      </div>

      <div className={styles.stat}>
        <FaUserFriends className={styles.statIcon} />
        <span className={styles.statValue}>
          <strong>{project.followersCount}</strong> seguidores
        </span>
      </div>
    </div>
  );
};
