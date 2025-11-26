import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "@/styles/forms.css";
import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext/AuthProvider";
import { QueryProvider } from "@/providers/QueryProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Gamix",
  description: "Conecte-se e compartilhe suas ideias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable}`}>
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
