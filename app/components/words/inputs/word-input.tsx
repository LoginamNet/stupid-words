import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

import { SearchParams } from "../interfaces";

interface ComponentProps {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  setWord(): void;
  getData(): Promise<void>;
}

export default function WordInput(props: ComponentProps) {
  const { setWord, getData } = props;

  const handleWordInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.setSearchParams({
      ...props.searchParams,
      word: e.currentTarget.value,
    });
  };

  useEffect(() => {
    setWord();
    getData();
  }, [getData, props.searchParams.word, setWord]);

  return (
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
  );
}
