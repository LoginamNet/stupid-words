import { Key } from "react";

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

export default async function Words() {
  async function getData(): Promise<StupidWords | undefined> {
    try {
      const res = await fetch(
        "https://stupid-words-api.vercel.app/api/stupidwords/"
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      //   await new Promise((resolve) => setTimeout(resolve, 2000));

      return res.json();
    } catch (err) {
      console.log(err);
    }
  }

  const stupidWords = await getData();

  return (
    <section>
      {stupidWords ? (
        stupidWords.data.map((el: Word, key: Key | null | undefined) => (
          <span key={key}>{el.word}</span>
        ))
      ) : (
        <p>Нет такого слова</p>
      )}
    </section>
  );
}
