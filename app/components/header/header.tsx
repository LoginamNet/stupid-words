import Link from "next/link";

import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/welcome">Привет</Link>
      <Link href="/">Словечки</Link>
      <Link href="/addword">Добавить слово</Link>
    </header>
  );
}
