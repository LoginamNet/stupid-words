import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { SearchParams } from "../interfaces";

import styles from "./filters.module.css";

interface ComponentProps {
  url: URL | undefined;
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  getData(): Promise<void>;
}

export default function Filters(props: ComponentProps) {
  function setSearch(url: URL | undefined, searchParams?: SearchParams) {
    if (url) {
      if (searchParams) {
        searchParams.mature
          ? url.searchParams.set("mature", searchParams?.mature)
          : url.searchParams.delete("mature");
        searchParams.word
          ? url.searchParams.set("word", searchParams?.word)
          : url.searchParams.delete("word");

        history.replaceState({}, "", `?${url.searchParams.toString()}`);
      }
    }
  }

  const handleWordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    props.setSearchParams({
      ...props.searchParams,
      word: value,
    });
  };

  const handleRadioInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.setSearchParams({
      ...props.searchParams,
      mature: e.currentTarget.value,
    });
  };

  return (
    <aside className={styles.filters}>
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
      Используем крепкие выражения?
      <label>
        <input
          type="radio"
          name="mature-input"
          value="false"
          id="mature-false-input"
          checked={props.searchParams.mature === "false"}
          onChange={(e) => handleRadioInput(e)}
        ></input>
        Выражаюсь словами поэтов
      </label>
      <label>
        <input
          type="radio"
          name="mature-input"
          value="true"
          id="mature-true-input"
          checked={props.searchParams.mature === "true"}
          onChange={(e) => handleRadioInput(e)}
        ></input>
        В роду были сапожники
      </label>
      <label>
        <input
          type="radio"
          name="mature-input"
          value=""
          id="mature-all-input"
          checked={!props.searchParams.mature}
          onChange={(e) => handleRadioInput(e)}
        ></input>
        Я готов увидеть всё
      </label>
      <input
        type="button"
        value="СЕГОДНЯ МЫ С ТОБОЙ ФИЛЬТРУЕМ"
        onClick={() => {
          setSearch(props.url, props.searchParams);
          props.getData();
        }}
      ></input>
    </aside>
  );
}
