import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { SearchParams } from "../interfaces";

import styles from "./top-bar.module.css";

interface ComponentProps {
  url: URL | undefined;
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  setWord(): void;
  setSort(): void;
  getData(): Promise<void>;
}

export default function TopBar(props: ComponentProps) {
  const { setWord, setSort, getData } = props;

  const sortOrders = [
    { order: "word-asc", name: "по алфавиту ↓" },
    { order: "word-desc", name: "по алфавиту ↑" },
    { order: "updatedAt-asc", name: "по дате ↓" },
    { order: "updatedAt-desc", name: "по дате ↑" },
    { order: "likes-asc", name: "по лайкам ↓" },
    { order: "likes-desc", name: "по лайкам ↑" },
  ];

  const handleWordInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.setSearchParams({
      ...props.searchParams,
      word: e.currentTarget.value,
    });
  };

  const handleSortInput = (e: ChangeEvent<HTMLSelectElement>) => {
    props.setSearchParams({
      ...props.searchParams,
      sort: e.currentTarget.value,
    });
  };

  useEffect(() => {
    setWord();
    setSort();
    getData();
  }, [getData, props.searchParams.sort, setSort, setWord]);

  return (
    <div className={styles.topBar}>
      <label>
        Словцо:
        <input
          type="text"
          name="word-input"
          value={props.searchParams.word ? props.searchParams.word : ""}
          id="word-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleWordInput(e)}
        ></input>
      </label>
      <label>
        Сортирнуть:
        <select
          name="sort-input"
          id="sort-input"
          value={props.searchParams.sort}
          onChange={(e) => {
            handleSortInput(e);
          }}
        >
          {sortOrders.map((sort, key) => (
            <option key={key} value={sort.order}>
              {sort.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
