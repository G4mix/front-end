import { ProjectScreen } from "@/components/Projects/components/ProjectScreen";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <div>Erro: ID do projeto não encontrado</div>;
  }

  return <ProjectScreen projectId={id} />;
}
