import styles from "./page.module.css";
import Words from "./components/words/words";

export default async function Home() {
  return (
    <main className={styles.main}>
      <h1>ГЛУПЫЕ СЛОВЕЧКИ</h1>
      <Words />
    </main>
  );
}
