import { useCallback, useEffect, useState } from "react";

import MatureInputs from "../inputs/mature-inputs";
import TypeInputs from "../inputs/type-inputs";

import { FilterParams } from "../interfaces";

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
  const [currentfilterParams, setCurrentfilterParams] =
    useState<FilterParams>(filterParams);
  const [isFiltersChanged, setIsFiltersChanged] = useState(false);

  const handleFilterParams = (keyToUpdate: string, valueToSet: string) => {
    setSearchParams({
      ...filterParams,
      [keyToUpdate]: valueToSet,
    });
  };

  const handleFiltersChanged = useCallback(() => {
    setIsFiltersChanged(true);
    setCurrentfilterParams({ ...currentfilterParams, ...filterParams });
  }, [currentfilterParams, filterParams]);

  const handleFiltersNotChanged = () => {
    setIsFiltersChanged(false);
  };

  useEffect(() => {
    if (
      currentfilterParams.mature !== filterParams.mature ||
      currentfilterParams.type !== filterParams.type
    ) {
      handleFiltersChanged();
    }
  }, [
    currentfilterParams.mature,
    currentfilterParams.type,
    filterParams.mature,
    filterParams.type,
    handleFiltersChanged,
  ]);

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
        className={`${styles.button} ${
          !isFiltersChanged && styles.button__disabled
        }`}
        type="button"
        value={"ПРИМЕНИТЬ"}
        onClick={() => {
          props.searchHandler(true, "page", "1", filterParams);
          handleFiltersNotChanged();
        }}
      ></input>
    </aside>
  );
}
