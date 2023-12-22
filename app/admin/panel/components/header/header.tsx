import Link from "next/link";

import styles from "./header.module.css";

export default async function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">Словечки</Link>
    </header>
  );
}
