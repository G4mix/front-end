import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "@/styles/forms.css";
import "@/styles/globals.css";

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
        {children}
      </body>
    </html>
  );
}
