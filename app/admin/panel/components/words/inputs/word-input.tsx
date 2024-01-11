import { ChangeEvent, useEffect, useState } from "react";

interface ComponentProps {
  handleSearch: (
    updateQuery: boolean,
    updateParams: boolean,
    goToFirtsPage: boolean,
    keyToUpdate?: string,
    valueToSet?: string
  ) => void;
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
    props.handleSearch(true, true, true, "word", currentWord);
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
