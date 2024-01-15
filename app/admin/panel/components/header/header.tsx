import Link from "next/link";

import styles from "./header.module.css";
import LogoutButton from "./buttons/logout-button";

export default async function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">Словечки</Link>
      <LogoutButton />
    </header>
  );
}
