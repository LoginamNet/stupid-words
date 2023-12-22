import Header from "./components/header/header";
import Footer from "./components/footer/footer";

import "./globals.css";
import styles from "./page.module.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
