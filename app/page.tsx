import { Key } from "react";
import styles from "./page.module.css";

interface Word {
  _id: string;
  word: string;
  type: string;
  text: string;
  mature: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  __v: number;
}

interface StupidWords {
  status: string;
  amount: number;
  data: Word[];
}

export default async function Home() {
  async function getData(): Promise<StupidWords | undefined> {
    try {
      const res = await fetch(
        "https://stupid-words-api.vercel.app/api/stupidwords/"
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      return res.json();
    } catch (err) {
      console.log(err);
    }
  }

  const stupidWords = await getData();
  console.log(stupidWords);

  return (
    <main className={styles.main}>
      <h1>Hello World!</h1>
      {stupidWords &&
        stupidWords.data.map((el: any, key: Key | null | undefined) => (
          <span key={key}>{el.word}</span>
        ))}
    </main>
  );
}
