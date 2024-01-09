import { ChangeEvent } from "react";

import { SearchParams } from "../interfaces";

import styles from "../filters/filters.module.css";

interface ComponentProps {
  searchParams: SearchParams;
  searchHandler: (
    immediatExecution: boolean,
    paramToChange: string,
    selectedValue: string
  ) => void;
}

export default function MatureInputs(props: ComponentProps) {
  const matureTypes = [
    { text: "Выражаюсь словами поэтов", type: "false", id: "false" },
    { text: "В роду были сапожники", type: "true", id: "true" },
    { text: "Я готов увидеть всё", type: "all", id: "all" },
  ];

  const handleRadioInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.searchHandler(false, "mature", e.currentTarget.value);
  };

  return (
    <fieldset className={styles.fieldset}>
      <legend>Используем крепкие выражения?</legend>
      {matureTypes.map((el, key) => (
        <label key={key}>
          <input
            type="radio"
            name="mature-input"
            value={el.type}
            id={`mature-${el.id}-input`}
            checked={
              props.searchParams.mature
                ? props.searchParams.mature === el.type
                : el.type === "all"
            }
            onChange={(e) => handleRadioInput(e)}
          ></input>
          {el.text}
        </label>
      ))}
    </fieldset>
  );
}
