import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { SearchParams } from "../interfaces";

import styles from "../filters/filters.module.css";

interface ComponentProps {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
}

export default function TypeInputs(props: ComponentProps) {
  const initialTypes = ["noun", "verb", "exp", "adj"];
  const initialTypesNames = [
    "существительные",
    "глаголы",
    "выражения",
    "прилагательные",
  ];

  let [wordTypes, setWordTypes] = useState(initialTypes);

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
    props.setSearchParams({
      ...props.searchParams,
      type: initialTypes.join("-"),
    });
  };

  useEffect(() => {
    props.searchParams.type &&
      setWordTypes(props.searchParams.type?.split("-"));
  }, [props.searchParams.type]);

  return (
    <fieldset className={styles.fieldset}>
      <legend>Тип выражений:</legend>
      {initialTypes.map((type, i) => (
        <label key={i}>
          <input
            type="checkbox"
            id={`${type}-input`}
            name={`${type}-input`}
            value={type}
            checked={wordTypes.includes(type) ? true : false}
            disabled={wordTypes.includes(type) && wordTypes.length === 1}
            onChange={(e) => handleCheckboxInput(e)}
          />
          {initialTypesNames[i]}
        </label>
      ))}
      <input
        type="button"
        value="Все типы"
        onClick={() => handleCheckboxAllInput()}
      ></input>
    </fieldset>
  );
}
