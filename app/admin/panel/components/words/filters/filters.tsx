import { Dispatch, SetStateAction } from "react";

import MatureInputs from "../inputs/mature-inputs";
import TypeInputs from "../inputs/type-inputs";

import { SearchParams } from "../interfaces";

import styles from "./filters.module.css";

interface ComponentProps {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  handleQuery: () => void;
}

export default function Filters(props: ComponentProps) {
  const { handleQuery } = props;

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
        value="Применить фильтры"
        onClick={() => {
          handleQuery();
        }}
      ></input>
    </aside>
  );
}
