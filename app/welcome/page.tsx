import { MainLayout } from "../layout";

import styles from "../page.module.css";

export default async function Welcome() {
  return (
    <MainLayout>
      <main className={styles.main}>
        <h1>Welcome page</h1>
      </main>
    </MainLayout>
  );
}
