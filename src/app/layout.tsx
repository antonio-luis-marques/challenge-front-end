import type { Metadata } from "next";
import "./globals.css";
import { GlobalProvider } from "@/components/Provider/GlobalProvider/GlobalProvider";
// import Header from "@/components/Header/Header";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: {
    default: "GJUNGLE",
    template: '%s - GJUNGLE'
  },
  description: "Encontre livros e materiais completos para sua preparação em exames de admissão. Conteúdos organizados para ajudá-lo a conquistar sua vaga.",
  twitter: {
    card: 'summary_large_image'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <Suspense>
            {children}
          </Suspense>
        </GlobalProvider>
      </body>

    </html>
  );
}
