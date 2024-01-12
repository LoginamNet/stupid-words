import { ChangeEvent, useEffect, useState } from "react";

import { SearchParams } from "../interfaces";

interface ComponentProps {
  searchParams: SearchParams;
  handleNewSearchParams: (newParams: SearchParams) => void;
}

export default function WordInput(props: ComponentProps) {
  const [currentWord, setCurrentWord] = useState<string | undefined>("");
  const [wordInputValue, setWordInputValue] = useState("");

  const handleWordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setWordInputValue(e.currentTarget.value);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setCurrentWord(wordInputValue);
    }, 700);
    return () => {
      clearTimeout(debounce);
    };
  }, [wordInputValue]);

  useEffect(() => {
    props.handleNewSearchParams({
      ...props.searchParams,
      word: currentWord,
      page: "1",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWord]);

  return (
    <label>
      <input
        type="text"
        name="word-input"
        value={wordInputValue ? wordInputValue : ""}
        placeholder="Введите слово для поиска"
        id="word-input"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleWordInput(e)}
      ></input>
    </label>
  );
}
