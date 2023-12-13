"use client";

import { Key, useEffect, useState } from "react";

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

export default function Words() {
  const [words, setWords] = useState<StupidWords>();

  async function getData(): Promise<void> {
    try {
      const queryStr = decodeURIComponent(window.location.href).split("?")[1];

      // const res = queryStr
      //   ? await fetch(`http://localhost:4000/api/stupidwords?${queryStr}`)
      //   : await fetch("http://localhost:4000/api/stupidwords");

      const res = queryStr
        ? await fetch(
            `stupid-words-api.vercel.app/api/stupidwords/?${queryStr}`
          )
        : await fetch("stupid-words-api.vercel.app/api/stupidwords");

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setWords(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
    console.log(decodeURIComponent(window.location.href).split("?")[1]);
  }, []);

  return (
    <section>
      {words?.data.length ? (
        words.data.map((el: Word, key: Key | null | undefined) => (
          <span key={key}>{el.word}</span>
        ))
      ) : (
        <p>Нет такого слова</p>
      )}
    </section>
  );
}
