import { ProfileScreen } from "@/components/Profile";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (!id) {
    return <div>Erro: ID do perfil não encontrado</div>;
  }

  return <ProfileScreen profileId={id} />;
}
