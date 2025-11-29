"use client";

import { useEffect } from "react";
import { getProjects } from "@/api/queries/project";
import { ProjectCard } from "./components/ProjectCard";
import { FaPuzzlePiece } from "react-icons/fa6";

import styles from "./styles.module.css";
import { SpinnerLoading } from "../SpinnerLoading";
import { QUERY_KEYS } from "@/api/keys";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/utils/toast";

export const ProjectsScreen = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.GET_PROJECTS],
    queryFn: () => getProjects({ page: 0, quantity: 20 }),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Erro ao carregar projetos");
    }
  }, [isError]);

  const projects = data?.data ?? [];

  if (isLoading) {
    return <SpinnerLoading isPrimary={true} />;
  }

  return (
    <div className={styles.projectsScreen}>
      <div className={styles.header}>
        <FaPuzzlePiece className={styles.icon} />
        <h1>Projetos</h1>
      </div>

      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <div className={styles.empty}>
          <p>Nenhum projeto encontrado</p>
        </div>
      )}
    </div>
  );
};
