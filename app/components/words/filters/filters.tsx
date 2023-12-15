import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { SearchParams } from "../interfaces";

import styles from "./filters.module.css";

interface ComponentProps {
  url: URL | undefined;
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  getData(): Promise<void>;
}

export default function Filters(props: ComponentProps) {
  let [wordTypes, setWordTypes] = useState<string[]>([
    "verb",
    "noun",
    "exp",
    "adj",
  ]);

  function setSearch(url: URL | undefined, searchParams?: SearchParams) {
    if (url) {
      if (searchParams) {
        searchParams.mature
          ? url.searchParams.set("mature", searchParams?.mature)
          : url.searchParams.delete("mature");

        searchParams.word
          ? url.searchParams.set("word", searchParams?.word)
          : url.searchParams.delete("word");

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
    }
  }

  const handleWordInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.setSearchParams({
      ...props.searchParams,
      word: e.currentTarget.value,
    });
  };

  const handleRadioInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.setSearchParams({
      ...props.searchParams,
      mature: e.currentTarget.value,
    });
  };

  const handleCheckboxInput = (e: ChangeEvent<HTMLInputElement>) => {
    wordTypes = wordTypes.includes(e.currentTarget.value)
      ? wordTypes.filter((type) => type !== e.currentTarget.value)
      : [...wordTypes, e.currentTarget.value];

    props.setSearchParams({
      ...props.searchParams,
      type: wordTypes.join("-"),
    });
  };

  const handleCheckboxAllInput = () => {
    wordTypes = ["verb", "noun", "exp", "adj"];

    props.setSearchParams({
      ...props.searchParams,
      type: wordTypes.join("-"),
    });
  };

  useEffect(() => {
    props.searchParams.type &&
      setWordTypes(props.searchParams.type?.split("-"));
  }, [props.searchParams.type]);

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
      <fieldset className={styles.fieldset}>
        <legend>Используем крепкие выражения?</legend>
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
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend>Типы</legend>
        <label>
          <input
            type="checkbox"
            id="exp-input"
            name="exp-input"
            value="exp"
            checked={wordTypes.includes("exp") ? true : false}
            disabled={wordTypes.includes("exp") && wordTypes.length === 1}
            onChange={(e) => handleCheckboxInput(e)}
          />
          выражения
        </label>
        <label>
          <input
            type="checkbox"
            id="noun-input"
            name="noun-input"
            value="noun"
            checked={wordTypes.includes("noun") ? true : false}
            disabled={wordTypes.includes("noun") && wordTypes.length === 1}
            onChange={(e) => handleCheckboxInput(e)}
          />
          существительные
        </label>
        <label>
          <input
            type="checkbox"
            id="verb-input"
            name="verb-input"
            value="verb"
            checked={wordTypes.includes("verb") ? true : false}
            disabled={wordTypes.includes("verb") && wordTypes.length === 1}
            onChange={(e) => handleCheckboxInput(e)}
          />
          глаголы
        </label>
        <label>
          <input
            type="checkbox"
            id="adj-input"
            name="adj-input"
            value="adj"
            checked={wordTypes.includes("adj") ? true : false}
            disabled={wordTypes.includes("adj") && wordTypes.length === 1}
            onChange={(e) => handleCheckboxInput(e)}
          />
          прилагательные
        </label>
        <input
          type="button"
          value="ВСЕ ВЕЗДЕ И СРАЗУ"
          onClick={() => handleCheckboxAllInput()}
        ></input>
      </fieldset>
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
