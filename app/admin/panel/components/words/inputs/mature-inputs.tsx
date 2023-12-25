import { ChangeEvent, Dispatch, SetStateAction } from "react";

import { SearchParams } from "../interfaces";

import styles from "../filters/filters.module.css";

interface ComponentProps {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
}

export default function MatureInputs(props: ComponentProps) {
  const matureTypes = [
    { text: "Выражаюсь словами поэтов", type: "false", id: "false" },
    { text: "В роду были сапожники", type: "true", id: "true" },
    { text: "Я готов увидеть всё", type: "", id: "all" },
  ];

  const handleRadioInput = (e: ChangeEvent<HTMLInputElement>) => {
    props.setSearchParams({
      ...props.searchParams,
      mature: e.currentTarget.value,
    });
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
              (props.searchParams.mature &&
                props.searchParams.mature === el.type) ||
              (!props.searchParams.mature && !el.type)
            }
            onChange={(e) => handleRadioInput(e)}
          ></input>
          {el.text}
        </label>
      ))}
    </fieldset>
  );
}
