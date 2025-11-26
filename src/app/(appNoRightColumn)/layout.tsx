import { MainLayout } from "@/components/Layout";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout rightColumn={false}>{children}</MainLayout>;
}
