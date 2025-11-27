"use client";

import { IUserProfile } from "@/interfaces/user";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import styles from "./styles.module.css";
import { UserIcon } from "@/components/Users";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toggleFollow } from "@/api/mutations/follow";
import { toast } from "@/utils/toast";
import { BiSolidUserCheck, BiSolidUserPlus } from "react-icons/bi";

interface ProfileHeaderProps {
  profile: IUserProfile;
  isPersonalProfile?: boolean;
}

export const ProfileHeader = ({
  profile,
  isPersonalProfile,
}: ProfileHeaderProps) => {
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing);

  const followMutation = useMutation({
    mutationFn: async () => {
      await toggleFollow({ targetUserId: profile.id });
    },
    onSuccess: () => {
      setIsFollowing(!isFollowing);
    },
    onError: () => {
      toast.error("Erro ao seguir/deixar de seguir usuário");
    },
  });

  const handleFollow = () => {
    followMutation.mutate();
  };

  return (
    <div className={styles.header}>
      <div className={styles.banner}>
        {profile.backgroundImage && (
          <Image
            src={profile.backgroundImage}
            alt=""
            fill
            className={styles.bannerImage}
          />
        )}
      </div>

      <div className={styles.profileInfo}>
        <div className={styles.avatarContainer}>
          <UserIcon
            displayName={profile.displayName ?? ""}
            icon={profile.icon}
            size={92}
            fontSize="3rem"
            rounded={false}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.nameEditContainer}>
            <h1>{profile.displayName}</h1>

            {isPersonalProfile && (
              <button className={styles.editBtn}>
                <FaEdit />
              </button>
            )}
          </div>

          {profile.user && (
            <p className={styles.username}>@{profile.user.username}</p>
          )}

          {profile.autobiography && (
            <p className={styles.bio}>{profile.autobiography}</p>
          )}

          {!isPersonalProfile && (
            <button
              onClick={handleFollow}
              className={
                styles.followBtn + (isFollowing ? " " + styles.following : "")
              }
            >
              {isFollowing ? (
                <>
                  <BiSolidUserCheck className={styles.icon}/> Seguindo
                </>
              ) : (
                <>
                  <BiSolidUserPlus className={styles.icon} /> Seguir
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
