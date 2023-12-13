import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stupid Words",
  description: "Some fun and stupid words",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <header>
          <Link href="/welcome">Welcome</Link>
          <Link href="/">Words</Link>
        </header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
