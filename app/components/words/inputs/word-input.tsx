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
  searchHandler: (
    immediatExecution: boolean,
    paramToChange: string,
    selectedValue: string
  ) => void;
}

export default function WordInput(props: ComponentProps) {
  const [wordInputValue, setWordInputValue] = useState(
    props.searchParams.word || ""
  );

  const handleWordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setWordInputValue(e.currentTarget.value);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      props.searchHandler(true, "word", wordInputValue);
    }, 700);
    return () => {
      clearTimeout(debounce);
    };
  }, [wordInputValue]);

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
