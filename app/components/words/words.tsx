"use client";

import { useCallback, useEffect, useState } from "react";

import List from "./list/list";
import TopBar from "./top-bar/top-bar";
import Filters from "./filters/filters";

import { SearchParams, StupidWords } from "./interfaces";

import styles from "./words.module.css";

export default function Words() {
  const [url, setUrl] = useState<URL>();
  const [isLoading, setIsLoading] = useState(false);
  const [words, setWords] = useState<StupidWords>();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    word: "",
    mature: "",
    type: "",
    sort: "",
  });

  const setSearch = useCallback(() => {
    if (url) {
      searchParams.mature
        ? url.searchParams.set("mature", searchParams?.mature)
        : url.searchParams.delete("mature");

      searchParams.type
        ? url.searchParams.set("type", searchParams?.type)
        : url.searchParams.delete("type");

      searchParams.type &&
        searchParams.type?.split("-").length === 4 &&
        url.searchParams.delete("type");

      url.searchParams.size
        ? history.replaceState({}, "", `?${url.searchParams.toString()}`)
        : history.replaceState({}, "", "/");
    }
  }, [searchParams.mature, searchParams.type, url]);

  const setWord = useCallback(() => {
    if (url) {
      searchParams.word
        ? url.searchParams.set("word", searchParams?.word)
        : url.searchParams.delete("word");

      url.searchParams.size
        ? history.replaceState({}, "", `?${url.searchParams.toString()}`)
        : history.replaceState({}, "", "/");
    }
  }, [searchParams.word, url]);

  const setSort = useCallback(() => {
    if (url) {
      searchParams.sort
        ? url.searchParams.set("sort", searchParams?.sort)
        : url.searchParams.delete("sort");

      url.searchParams.size
        ? history.replaceState({}, "", `?${url.searchParams.toString()}`)
        : history.replaceState({}, "", "/");
    }
  }, [searchParams.sort, url]);

  const getData = useCallback(async (): Promise<void> => {
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
  }, []);

  useEffect(() => {
    setUrl(new URL(window.location.href));
    setSearchParams({
      mature: new URL(window.location.href).searchParams
        .get("mature")
        ?.toString(),
      word: new URL(window.location.href).searchParams.get("word")?.toString(),
      type: new URL(window.location.href).searchParams.get("type")?.toString(),
      sort: new URL(window.location.href).searchParams.get("sort")?.toString(),
    });
    getData();
  }, [getData]);

  return (
    <section className={styles.words}>
      <Filters
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setSearch={setSearch}
        getData={getData}
      />
      <div className={styles.words_list}>
        <TopBar
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setWord={setWord}
          setSort={setSort}
          getData={getData}
        />
        <List words={words} isLoading={isLoading} />
      </div>
    </section>
  );
}
