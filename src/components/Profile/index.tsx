"use client";

import { useAuth } from "@/hooks/useAuth";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileStats } from "./components/ProfileStats";
import { ProfileIdeas } from "./components/ProfileIdeas";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { IUserProfile } from "@/interfaces/user";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/api/queries/user";
import { toast } from "@/utils/toast";
import { SpinnerLoading } from "../SpinnerLoading";
import { QUERY_KEYS } from "@/api/keys";

export const ProfileScreen = ({
  profileId = null,
}: {
  profileId?: string | null;
}) => {
  const { userProfile } = useAuth();
  const [profile, setProfile] = useState<IUserProfile | null>(null);

  const isPersonalProfile = profileId === userProfile?.id || profileId === null;

  const {
    data: profileData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_PROFILE, profileId],
    queryFn: () => getUserById(profileId as string),
    enabled: !!profileId && !isPersonalProfile && !!userProfile,
  });

  useEffect(() => {
    if (userProfile && isPersonalProfile) {
      setProfile(userProfile);
    }
  }, [userProfile, isPersonalProfile]);

  useEffect(() => {
    if (isSuccess) {
      setProfile(profileData);
    }
  }, [isSuccess, profileData]);

  useEffect(() => {
    if (isError) {
      toast.error("Erro ao carregar perfil");
    }
  }, [isError]);

  if (!userProfile || !profile) {
    return <SpinnerLoading isPrimary={true} />;
  }

  if (!isPersonalProfile && isLoading) {
    return <SpinnerLoading isPrimary={true} />;
  }

  return (
    <div className={styles.profileScreen}>
      <ProfileHeader profile={profile} isPersonalProfile={isPersonalProfile} />
      <div className={styles.profileContent}>
        <ProfileStats userProfile={profile} />
        <ProfileIdeas userProfileId={profile.id} />
      </div>
    </div>
  );
};
