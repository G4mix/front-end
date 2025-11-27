import { IdeaScreen } from "@/components/Idea/components/IdeaScreen";

export default async function IdeaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <div>Erro: ID da ideia não encontrado</div>;
  }

  return <IdeaScreen ideaId={id} />;
}
