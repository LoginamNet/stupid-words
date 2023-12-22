import type { Metadata } from "next";

import Header from "./components/header/header";
import Navigation from "./components/navigation/navigation";

import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Stupid Words",
  description: "Some fun and stupid words",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.panel}>
      <Header />
      <main className={styles.main}>
        <Navigation />
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
