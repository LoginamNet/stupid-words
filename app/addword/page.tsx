import MainLayout from "../main-layout";
import AddWordForm from "./components/form/form";

export default async function AddWord() {
  return (
    <MainLayout>
      <h1>ДОБАВИТЬ НОВОЕ СЛОВО</h1>
      <AddWordForm />
    </MainLayout>
  );
}
