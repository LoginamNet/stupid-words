import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

import LoginForm from "./components/form/form";

import styles from "./page.module.css";

export default async function AdminLogin() {
  const token = getCookie("sw_auth_token", { cookies });
  const res = await fetch(
    `https://stupid-words-api.vercel.app/api/auth/admin/${token}`
  );
  const isAuth = res.status === 201;

  if (token && isAuth) {
    redirect("/admin/panel/actual");
  } else
    return (
      <main className={styles.main}>
        <LoginForm />
      </main>
    );
}
