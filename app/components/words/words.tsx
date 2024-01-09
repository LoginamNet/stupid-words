"use client";

import { useCallback, useEffect, useState } from "react";

import List from "./list/list";
import TopBar from "./top-bar/top-bar";
import Pagination from "./pagination/pagination";
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
    page: "",
    limit: "",
  });

  const searchParamsHandler = (url: URL) => {
    setSearchParams({
      mature: url.searchParams.get("mature")?.toString(),
      word: url.searchParams.get("word")?.toString(),
      type: url.searchParams.get("type")?.toString(),
      page: url.searchParams.get("page")?.toString() || "1",
      sort: url.searchParams.get("sort")?.toString(),
      limit: url.searchParams.get("limit")?.toString(),
    });
  };

  const searchHandler = (
    immediatExecution: boolean,
    paramToChange: string,
    selectedValue: string
  ) => {
    if (url) {
      selectedValue
        ? url.searchParams.set(paramToChange, selectedValue)
        : url.searchParams.delete(paramToChange);

      paramToChange !== "page" && url.searchParams.set("page", "1");

      url.searchParams.size
        ? history.replaceState({}, "", `?${url.searchParams.toString()}`)
        : history.replaceState({}, "", "/");

      searchParamsHandler(url);
      immediatExecution && getData();
    }
  };

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
      console.log("RENDER!");
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    setUrl(new URL(window.location.href));
    searchParamsHandler(new URL(window.location.href));

    getData();
  }, [getData]);

  return (
    <section className={styles.words}>
      <Filters
        searchParams={searchParams}
        searchHandler={searchHandler}
        getData={getData}
      />
      <div className={styles.words_list}>
        <TopBar searchParams={searchParams} searchHandler={searchHandler} />
        <Pagination
          words={words}
          isLoading={isLoading}
          searchParams={searchParams}
          searchHandler={searchHandler}
        />
        <List words={words} isLoading={isLoading} />
      </div>
    </section>
  );
}
