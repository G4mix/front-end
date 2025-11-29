"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/queries/project";
import { ProjectEdit } from "@/components/Projects/components/ProjectEdit";
import { SpinnerLoading } from "@/components/SpinnerLoading";
import { QUERY_KEYS } from "@/api/keys";
import { toast } from "@/utils/toast";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function ProjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { userProfile } = useAuth();
  const { id } = use(params);
  
  const { data: project, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.GET_PROJECT_BY_ID, id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Erro ao carregar projeto");
      router.push("/projects");
    }
  }, [isError, router]);

  useEffect(() => {
    if (project && !project.isOwner) {
      toast.error("Você não tem permissão para editar este projeto");
      router.push(`/projects/${id}`);
    }
  }, [project, id, router]);

  if (isLoading || !project || !userProfile) {
    return <SpinnerLoading isPrimary />;
  }

  return <ProjectEdit project={project} />;
}

