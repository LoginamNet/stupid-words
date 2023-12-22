import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import "./globals.css";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stupid Words",
  description: "Some fun and stupid words",
};

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
