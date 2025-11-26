"use client";

import { useState, useEffect } from "react";
import { getProjects } from "@/api/queries/project";
import { IProject } from "@/interfaces/project";
import { ProjectCard } from "../ProjectCard";
import { RiProjectorFill } from "react-icons/ri";
import styles from "./styles.module.css";
import { FaPuzzlePiece } from "react-icons/fa6";

export const ProjectsScreen = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects({ page: 0, quantity: 20 });
        setProjects(data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Carregando projetos...</div>;
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
