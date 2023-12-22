import MainLayout from "./main-layout";
import Words from "./components/words/words";

export default async function Home() {
  return (
    <MainLayout>
      <h1>ГЛУПЫЕ СЛОВЕЧКИ</h1>
      <Words />
    </MainLayout>
  );
}
