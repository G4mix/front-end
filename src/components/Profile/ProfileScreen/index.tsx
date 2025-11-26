"use client";

import { useAuth } from "@/hooks/useAuth";
import { ProfileHeader } from "../ProfileHeader";
import { ProfileStats } from "../ProfileStats";
import { ProfileIdeas } from "../ProfileIdeas";
import styles from "./styles.module.css";

export const ProfileScreen = () => {
  const { userProfile } = useAuth();

  if (!userProfile) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.profileScreen}>
      <ProfileHeader userProfile={userProfile} />
      <ProfileStats userProfile={userProfile} />
      <ProfileIdeas userProfileId={userProfile.id} />
    </div>
  );
};

