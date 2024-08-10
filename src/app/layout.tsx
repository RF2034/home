import React from "react";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-zen-maru-gothic",
});

export const metadata: Metadata = {
  title: "FUNBARE*ねっと",
  description: "cigareのブログです",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${zenMaruGothic.variable}`}>
      <body className="flex flex-col min-h-screen font-sans">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
          <Analytics />
        </main>
        <Footer />
      </body>
    </html>
  );
}
