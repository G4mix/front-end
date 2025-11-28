"use client";

import { Header } from "./components/Header";
import { Stats } from "./components/Stats";
import { Ideas } from "./components/Ideas";
import styles from "./styles.module.css";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/queries/project";
import { toast } from "@/utils/toast";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { useEffect } from "react";
import { QUERY_KEYS } from "@/api/keys";

export const ProjectScreen = ({
  projectId,
}: {
  projectId: string;
}) => {
  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.GET_PROJECT_BY_ID, projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Erro ao carregar projeto");
    }
  }, [isError]);

  if (isLoading || !project) {
    return <SpinnerLoading isPrimary={true} />;
  }

  return (
    <div className={styles.projectScreen}>
      <Header project={project} />
      <div className={styles.projectContent}>
        <Stats project={project} />
        <Ideas projectId={project.id} />
      </div>
    </div>
  );
};
