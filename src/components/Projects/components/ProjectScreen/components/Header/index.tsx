"use client";

import { IProject } from "@/interfaces/project";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import styles from "./styles.module.css";
import { UserIcon } from "@/components/Users";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFollow } from "@/api/mutations/follow";
import { toast } from "@/utils/toast";
import { BiSolidUserCheck, BiSolidUserPlus } from "react-icons/bi";
import Link from "next/link";
import { QUERY_KEYS } from "@/api/keys";

interface HeaderProps {
  project: IProject;
}

export const Header = ({ project }: HeaderProps) => {
  const queryClient = useQueryClient();

  const [isFollowing, setIsFollowing] = useState(project.isFollowing);

  const followMutation = useMutation({
    mutationFn: async () => {
      await toggleFollow({ targetProjectId: project.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PROJECT_BY_ID, project.id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_PROJECTS],
      });
      setIsFollowing(!isFollowing);
    },
    onError: () => {
      toast.error("Erro ao seguir/deixar de seguir projeto");
    },
  });

  const handleFollow = () => {
    followMutation.mutate();
  };

  return (
    <div className={styles.header}>
      <div className={styles.banner}>
        {project.backgroundImage && (
          <Image
            src={project.backgroundImage}
            alt=""
            fill
            className={styles.bannerImage}
          />
        )}
      </div>

      <div className={styles.profileInfo}>
        <div className={styles.avatarContainer}>
          <UserIcon
            displayName={project.title}
            icon={project.icon}
            size={92}
            fontSize="3rem"
            rounded={false}
          />
        </div>

        <div className={styles.info}>
          <div className={styles.nameEditContainer}>
            <h1>{project.title}</h1>

            {project.isOwner && (
              <Link href={`/projects/${project.id}/edit`} className={styles.editBtn}>
                <FaEdit />
              </Link>
            )}
          </div>

          <Link
            href={`/profile/${project.owner.displayName}`}
            className={styles.username}
          >
            Por @{project.owner.displayName}
          </Link>

          {project.description && (
            <p className={styles.bio}>{project.description}</p>
          )}

          {!project.isOwner && (
            <button
              onClick={handleFollow}
              className={
                styles.followBtn + (isFollowing ? " " + styles.following : "")
              }
              disabled={followMutation.isPending}
            >
              {isFollowing ? (
                <>
                  <BiSolidUserCheck className={styles.icon} /> Seguindo
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
