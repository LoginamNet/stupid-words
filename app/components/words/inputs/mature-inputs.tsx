import { ChangeEvent } from "react";

import { FilterParams } from "../interfaces";

import styles from "../filters/filters.module.css";

interface ComponentProps {
  filterParams: FilterParams;
  handleFilterParams: (keyToUpdate: string, valueToSet: string) => void;
}

export default function MatureInputs(props: ComponentProps) {
  const matureTypes = [
    { text: "Выражаюсь словами поэтов", type: "false", id: "false" },
    { text: "В роду были сапожники", type: "true", id: "true" },
    { text: "Я готов увидеть всё", type: "all", id: "all" },
  ];

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
              props.filterParams.mature
                ? props.filterParams.mature === el.type
                : el.type === "all"
            }
            onChange={(e) => props.handleFilterParams("mature", e.target.value)}
          ></input>
          {el.text}
        </label>
      ))}
    </fieldset>
  );
}
