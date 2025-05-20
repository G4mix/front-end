import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "@/styles/forms.css";
import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/contexts/AuthContext/AuthProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gamix",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} ${roboto.variable}`}>
        <AuthProvider>
          {children}

          <Navbar />
        </AuthProvider>
      </body>
    </html>
  );
}
