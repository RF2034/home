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
  title: "FUNBARE.net",
  description: "cigareのブログです",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' font-size='28'%3E🍣%3C/text%3E%3C/svg%3E",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  },
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
