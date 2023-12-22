import { MainLayout } from "../layout";
import AddWordForm from "./components/form/form";

import styles from "../page.module.css";

export default async function AddWord() {
  return (
    <MainLayout>
      <main className={styles.main}>
        <h1>ДОБАВИТЬ НОВОЕ СЛОВО</h1>
        <AddWordForm />
      </main>
    </MainLayout>
  );
}
