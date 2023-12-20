import styles from "../page.module.css";
import AddWordForm from "./components/form/form";

export default async function AddWord() {
  return (
    <main className={styles.main}>
      <h1>ДОБАВИТЬ НОВОЕ СЛОВО</h1>
      <AddWordForm />
    </main>
  );
}
