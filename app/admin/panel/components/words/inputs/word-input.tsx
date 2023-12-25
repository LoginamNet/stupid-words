import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { SearchParams } from "../interfaces";

interface ComponentProps {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  handleQuery: () => void;
}

export default function WordInput(props: ComponentProps) {
  const { handleQuery } = props;
  const [currentWord, setCurrentWord] = useState<string | undefined>("");
  const [wordInputValue, setWordInputValue] = useState("");

  const handleWordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setWordInputValue(e.currentTarget.value);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      props.setSearchParams({
        ...props.searchParams,
        word: wordInputValue,
      });
    }, 700);
    return () => {
      clearTimeout(debounce);
    };
  }, [props, wordInputValue]);

  useEffect(() => {
    if (currentWord !== props.searchParams.word) {
      setCurrentWord(props.searchParams.word);
      handleQuery();
    }
  }, [currentWord, props.searchParams.word, handleQuery]);

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
