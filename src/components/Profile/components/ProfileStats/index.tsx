import { IUserProfile } from "@/interfaces/user";
import { FaUserFriends } from "react-icons/fa";
import styles from "./styles.module.css";

interface ProfileStatsProps {
  userProfile: IUserProfile;
}

export const ProfileStats = ({ userProfile }: ProfileStatsProps) => {
  return (
    <div className={styles.stats}>
      <div className={styles.stat}>
        <FaUserFriends className={styles.statIcon} />
        <span className={styles.statValue}>
          <strong>{userProfile.followers}</strong> seguidores
        </span>
      </div>

      <div className={styles.stat}>
        <FaUserFriends className={styles.statIcon} />
        <span className={styles.statValue}>
          <strong>{userProfile.following}</strong> seguindo
        </span>
      </div>
    </div>
  );
};
