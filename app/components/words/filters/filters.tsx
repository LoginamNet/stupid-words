import { useState } from "react";

import MatureInputs from "../inputs/mature-inputs";
import TypeInputs from "../inputs/type-inputs";

import { FilterParams, SearchParams } from "../interfaces";

import styles from "./filters.module.css";

interface ComponentProps {
  isLoading: boolean;
  searchHandler: (
    immediateExecution: boolean,
    paramToChange: string,
    selectedValue: string,
    filterParams?: FilterParams
  ) => void;
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
    <aside className={styles.filters}>
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
        value="СЕГОДНЯ МЫ С ТОБОЙ ФИЛЬТРУЕМ"
        onClick={() => {
          props.searchHandler(true, "page", "1", filterParams);
        }}
      ></input>
    </aside>
  );
}
