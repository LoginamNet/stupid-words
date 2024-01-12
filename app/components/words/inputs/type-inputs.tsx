import { ChangeEvent, useEffect, useState } from "react";

import { FilterParams } from "../interfaces";

import styles from "../filters/filters.module.css";

interface ComponentProps {
  filterParams: FilterParams;
  handleFilterParams: (keyToUpdate: string, valueToSet: string) => void;
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

    props.handleFilterParams("type", wordTypes.join("-"));
  };

  const handleCheckboxAllInput = () => {
    props.handleFilterParams("type", initialTypes.join("-"));
  };

  useEffect(() => {
    props.filterParams.type &&
      setWordTypes(props.filterParams.type?.split("-"));
  }, [props.filterParams.type]);

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
