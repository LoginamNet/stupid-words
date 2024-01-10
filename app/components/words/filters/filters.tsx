import { Dispatch, SetStateAction } from "react";

import MatureInputs from "../inputs/mature-inputs";
import TypeInputs from "../inputs/type-inputs";

import { SearchParams } from "../interfaces";

import styles from "./filters.module.css";

interface ComponentProps {
  searchParams: SearchParams;
  searchHandler: (
    immediateExecution: boolean,
    paramToChange: string,
    selectedValue: string
  ) => void;
  getData(): Promise<void>;
}

export default function Filters(props: ComponentProps) {
  return (
    <aside className={styles.filters}>
      <MatureInputs
        searchParams={props.searchParams}
        searchHandler={props.searchHandler}
      />
      <TypeInputs
        searchParams={props.searchParams}
        searchHandler={props.searchHandler}
      />
      <input
        type="button"
        value="СЕГОДНЯ МЫ С ТОБОЙ ФИЛЬТРУЕМ"
        onClick={() => {
          props.getData();
        }}
      ></input>
    </aside>
  );
}
