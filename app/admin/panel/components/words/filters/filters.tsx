import { useState } from "react";

import MatureInputs from "../inputs/mature-inputs";
import TypeInputs from "../inputs/type-inputs";

import { FilterParams, SearchParams, StupidWords } from "../interfaces";

import styles from "./filters.module.css";

interface ComponentProps {
  words: StupidWords | undefined;
  isLoading: boolean;
  handleNewSearchParams: (newParams: SearchParams) => void;
}

export default function Filters(props: ComponentProps) {
  const [filterParams, setSearchParams] = useState<FilterParams>({
    mature: "",
    type: "",
  });

  const handleFilterParams = (keyToUpdate: string, valueToSet: string) => {
    setSearchParams({
      ...filterParams,
      [keyToUpdate]: valueToSet,
    });
  };

  return (
    <aside
      className={`${styles.filters} ${
        (props.isLoading || !props.words) && styles.disabled
      }`}
    >
      <MatureInputs
        filterParams={filterParams}
        handleFilterParams={handleFilterParams}
      />
      <TypeInputs
        filterParams={filterParams}
        handleFilterParams={handleFilterParams}
      />
      <input
        type="button"
        value="Применить фильтры"
        onClick={() => {
          props.handleNewSearchParams({ ...filterParams, page: "1" });
        }}
      ></input>
    </aside>
  );
}
