"use client";

import { useEffect, useState } from "react";

import { SearchParams, StupidWords } from "./interfaces";

import List from "./list/list";
import Filters from "./filters/filters";

import styles from "./words.module.css";

export default function Words() {
  const [isLoading, setIsLoading] = useState(false);
  const [words, setWords] = useState<StupidWords>();
  const [url, setUrl] = useState<URL | undefined>();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    word: "",
    mature: "",
  });

  async function getData(): Promise<void> {
    try {
      setIsLoading(true);
      const queryStr = decodeURIComponent(window.location.href).split("?")[1];

      const res = queryStr
        ? await fetch(
            `https://stupid-words-api.vercel.app/api/stupidwords?${queryStr}`
          )
        : await fetch("https://stupid-words-api.vercel.app/api/stupidwords");

      if (!res.ok) {
        setIsLoading(false);
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      setWords(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setUrl(new URL(window.location.href));
    setSearchParams({
      mature: new URL(window.location.href).searchParams
        .get("mature")
        ?.toString(),
      word: new URL(window.location.href).searchParams.get("word")?.toString(),
    });
    getData();
  }, []);

  return (
    <section className={styles.words}>
      <Filters
        url={url}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        getData={getData}
      />
      <List words={words} isLoading={isLoading} />
    </section>
  );
}
