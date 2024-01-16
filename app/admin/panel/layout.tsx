import type { Metadata } from "next";

import { redirect } from "next/navigation";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

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
  const token = getCookie("sw_auth_token", { cookies });
  const res = await fetch(
    `https://stupid-words-api.vercel.app/api/auth/admin/${token}`
  );
  const isAuth = res.status === 201;

  if (!token || isAuth) {
    redirect("/admin/login");
  } else
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
