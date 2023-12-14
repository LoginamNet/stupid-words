"use client";

import { ChangeEvent, Key, useEffect, useState } from "react";

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

interface SearchParams {
  word?: string;
  mature?: string;
}

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
            `https://stupid-words-api.vercel.app/api/stupidwords/?${queryStr}`
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
    setSearchParams({
      ...searchParams,
      word: value,
    });
  };

  const handleRadioInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...searchParams,
      mature: e.currentTarget.value,
    });
  };

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
    <section>
      <form name="test">
        <label>
          Словцо:
          <input
            type="text"
            name="word-input"
            value={searchParams.word ? searchParams.word : ""}
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
            checked={searchParams.mature === "false"}
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
            checked={searchParams.mature === "true"}
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
            checked={!searchParams.mature}
            onChange={(e) => handleRadioInput(e)}
          ></input>
          Я готов увидеть всё
        </label>
        <input
          type="button"
          value="СЕГОДНЯ МЫ С ТОБОЙ ФИЛЬТРУЕМ"
          onClick={() => {
            setSearch(url, searchParams);
            getData();
          }}
        ></input>
      </form>

      {!words || isLoading ? (
        <p>Грузим словечки...</p>
      ) : words?.data.length ? (
        words.data.map((el: Word, key: Key | null | undefined) => (
          <div key={key}>
            <h3>{el.word}</h3>
            <p>{el.text}</p>
            <span>{el.mature === "true" ? "18+ контент" : "Детям можно"}</span>
          </div>
        ))
      ) : (
        <p>К сожалению (или нет), такого слова не существует</p>
      )}
    </section>
  );
}
