import { FilterParams } from "../interfaces";

import styles from "../filters/filters.module.css";

interface ComponentProps {
  filterParams: FilterParams;
  handleFilterParams: (keyToUpdate: string, valueToSet: string) => void;
}

export default function MatureInputs(props: ComponentProps) {
  const matureTypes = [
    { text: "Только цензурные", type: "false", id: "false" },
    { text: "Только 18+", type: "true", id: "true" },
    { text: "Всё", type: "", id: "all" },
  ];

  return (
    <fieldset className={styles.fieldset}>
      <legend>Взрослый контент:</legend>
      {matureTypes.map((el, key) => (
        <label key={key}>
          <input
            type="radio"
            name="mature-input"
            value={el.type}
            id={`mature-${el.id}-input`}
            checked={
              (props.filterParams.mature &&
                props.filterParams.mature === el.type) ||
              (!props.filterParams.mature && !el.type)
            }
            onChange={(e) => props.handleFilterParams("mature", e.target.value)}
          ></input>
          {el.text}
        </label>
      ))}
    </fieldset>
  );
}
