import styles from "./page.module.css";
import Words from "./components/words/words";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className={styles.main}>
      <h1>Hello World!</h1>
      <Suspense fallback={<p>Грузим слова...</p>}>
        <Words />
      </Suspense>
    </main>
  );
}
