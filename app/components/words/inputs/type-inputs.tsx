import { ChangeEvent, useEffect, useState } from "react";

import { SearchParams } from "../interfaces";

import styles from "../filters/filters.module.css";

interface ComponentProps {
  searchParams: SearchParams;
  searchHandler: (
    immediateExecution: boolean,
    paramToChange: string,
    selectedValue: string
  ) => void;
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

    props.searchHandler(false, "type", wordTypes.join("-"));
  };

  const handleCheckboxAllInput = () => {
    props.searchHandler(false, "type", initialTypes.join("-"));
  };

  useEffect(() => {
    props.searchParams.type &&
      setWordTypes(props.searchParams.type?.split("-"));
  }, [props.searchParams.type]);

  return (
    <fieldset className={styles.fieldset}>
      <legend>Типы</legend>
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
        value="ВСЕ ВЕЗДЕ И СРАЗУ"
        onClick={() => handleCheckboxAllInput()}
      ></input>
    </fieldset>
  );
}
