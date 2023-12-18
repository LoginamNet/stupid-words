import { Dispatch, SetStateAction } from "react";

import MatureInputs from "../inputs/mature-inputs";
import TypeInputs from "../inputs/type-inputs";

import { SearchParams } from "../interfaces";

import styles from "./filters.module.css";

interface ComponentProps {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  setSearch(): void;
  getData(): Promise<void>;
}

export default function Filters(props: ComponentProps) {
  return (
    <aside className={styles.filters}>
      <MatureInputs
        searchParams={props.searchParams}
        setSearchParams={props.setSearchParams}
      />
      <TypeInputs
        searchParams={props.searchParams}
        setSearchParams={props.setSearchParams}
      />
      <input
        type="button"
        value="СЕГОДНЯ МЫ С ТОБОЙ ФИЛЬТРУЕМ"
        onClick={() => {
          props.setSearch();
          props.getData();
        }}
      ></input>
    </aside>
  );
}
