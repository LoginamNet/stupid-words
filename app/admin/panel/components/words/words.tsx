"use client";

import { useCallback, useEffect, useState } from "react";

import List from "./list/list";
import TopBar from "./top-bar/top-bar";
import Filters from "./filters/filters";

import { createSearchQuery } from "./ulits";

import { SearchParams, StupidWords } from "./interfaces";

import styles from "./words.module.css";

interface ComponentProps {
  APIEndPoint: string;
}

export default function Words(props: ComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [words, setWords] = useState<StupidWords>();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    word: "",
    mature: "",
    type: "",
    sort: "",
  });
  const [queryString, setQueryString] = useState("");

  const handleQuery = () => {
    setQueryString(createSearchQuery(searchParams));
  };

  const getData = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);

      const res = queryString
        ? await fetch(
            `https://stupid-words-api.vercel.app/api/${props.APIEndPoint}?${queryString}`
          )
        : await fetch(
            `https://stupid-words-api.vercel.app/api/${props.APIEndPoint}`
          );

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
  }, [props.APIEndPoint, queryString]);

  useEffect(() => {
    getData();
  }, [getData, queryString]);

  return (
    <div className={styles.words}>
      <Filters
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        handleQuery={handleQuery}
      />
      <div className={styles.words_list}>
        <TopBar
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          handleQuery={handleQuery}
        />
        <List
          APIEndPoint={props.APIEndPoint}
          words={words}
          isLoading={isLoading}
          getData={getData}
        />
      </div>
    </div>
  );
}
