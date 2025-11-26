import { IUserProfile } from "@/interfaces/user";
import { FaUserFriends, FaHeart } from "react-icons/fa";
import { BsFillLightningChargeFill } from "react-icons/bs";
import styles from "./styles.module.css";

interface ProfileStatsProps {
  userProfile: IUserProfile;
}

export const ProfileStats = ({ userProfile }: ProfileStatsProps) => {
  return (
    <div className={styles.stats}>
      <div className={styles.stat}>
        <div className={styles.statIcon}>
          <FaUserFriends />
        </div>
        <div className={styles.statInfo}>
          <span className={styles.statValue}>{userProfile.followersCount}</span>
          <span className={styles.statLabel}>Seguidores</span>
        </div>
      </div>

      <div className={styles.stat}>
        <div className={styles.statIcon}>
          <FaUserFriends />
        </div>
        <div className={styles.statInfo}>
          <span className={styles.statValue}>{userProfile.followingCount}</span>
          <span className={styles.statLabel}>Seguindo</span>
        </div>
      </div>

      <div className={styles.stat}>
        <div className={styles.statIcon}>
          <BsFillLightningChargeFill />
        </div>
        <div className={styles.statInfo}>
          <span className={styles.statValue}>12</span>
          <span className={styles.statLabel}>Ideias</span>
        </div>
      </div>
    </div>
  );
};

