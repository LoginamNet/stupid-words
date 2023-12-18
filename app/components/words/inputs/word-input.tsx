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
  setWord(): void;
  getData(): Promise<void>;
}

export default function WordInput(props: ComponentProps) {
  const { setWord, getData } = props;
  const [wordInputValue, setWordInputValue] = useState(props.searchParams.word);

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
    setWordInputValue(props.searchParams.word);
    setWord();
    getData();
  }, [getData, props.searchParams.word, setWord]);

  return (
    <label>
      Словцо:
      <input
        type="text"
        name="word-input"
        value={wordInputValue}
        id="word-input"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleWordInput(e)}
      ></input>
    </label>
  );
}
