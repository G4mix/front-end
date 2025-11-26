import { IUserProfile } from "@/interfaces/user";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import Image from "next/image";
import styles from "./styles.module.css";

interface ProfileHeaderProps {
  userProfile: IUserProfile;
}

export const ProfileHeader = ({ userProfile }: ProfileHeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.banner}>
        {userProfile.backgroundImage && (
          <Image
            src={userProfile.backgroundImage}
            alt=""
            fill
            className={styles.bannerImage}
          />
        )}
      </div>

      <div className={styles.profileInfo}>
        <div className={styles.avatarContainer}>
          {userProfile.icon ? (
            <Image
              src={userProfile.icon}
              alt=""
              width={120}
              height={120}
              className={styles.avatar}
            />
          ) : (
            <FaUserCircle className={styles.avatarIcon} />
          )}
        </div>

        <div className={styles.info}>
          <h1>{userProfile.displayName}</h1>
          {userProfile.user && <p className={styles.username}>@{userProfile.user.username}</p>}
          {userProfile.autobiography && (
            <p className={styles.bio}>{userProfile.autobiography}</p>
          )}
          {userProfile.links && userProfile.links.length > 0 && (
            <div className={styles.links}>
              {userProfile.links.map((link, index) => (
                <a key={index} href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              ))}
            </div>
          )}
        </div>

        <button className={styles.editBtn}>
          <FaEdit /> Editar Perfil
        </button>
      </div>
    </div>
  );
};

