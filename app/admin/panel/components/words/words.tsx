"use client";

import { useCallback, useEffect, useState } from "react";

import List from "./list/list";
import TopBar from "./top-bar/top-bar";
import Filters from "./filters/filters";
import Pagination from "./pagination/pagination";

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
    page: "1",
    limit: "",
  });
  const [queryString, setQueryString] = useState("");

  const handleNewSearchParams = (newParams: SearchParams) => {
    setSearchParams({
      ...searchParams,
      ...newParams,
    });
  };

  const handleNewQuery = (newParams: SearchParams) => {
    setQueryString(createSearchQuery(newParams));
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
    handleNewQuery(searchParams);
  }, [searchParams]);

  useEffect(() => {
    getData();
  }, [getData, queryString]);

  return (
    <div className={styles.words}>
      <Filters
        words={words}
        isLoading={isLoading}
        handleNewSearchParams={handleNewSearchParams}
      />
      <div className={styles.words_list}>
        <TopBar
          words={words}
          isLoading={isLoading}
          searchParams={searchParams}
          handleNewSearchParams={handleNewSearchParams}
          getData={getData}
        />
        <List
          APIEndPoint={props.APIEndPoint}
          words={words}
          isLoading={isLoading}
          getData={getData}
        />
        <Pagination
          words={words}
          isLoading={isLoading}
          searchParams={searchParams}
          handleNewSearchParams={handleNewSearchParams}
        />
      </div>
    </div>
  );
}
