import WordInput from "../inputs/word-input";
import SortInputs from "../inputs/sort-inputs";

import { SearchParams } from "../interfaces";

import styles from "./top-bar.module.css";
import LimitInputs from "../inputs/limit-input";

interface ComponentProps {
  searchParams: SearchParams;
  searchHandler: (
    immediatExecution: boolean,
    paramToChange: string,
    selectedValue: string
  ) => void;
}

export default function TopBar(props: ComponentProps) {
  return (
    <div className={styles.topBar}>
      <WordInput
        searchParams={props.searchParams}
        searchHandler={props.searchHandler}
      />
      <LimitInputs
        searchParams={props.searchParams}
        searchHandler={props.searchHandler}
      />
      <SortInputs
        searchParams={props.searchParams}
        searchHandler={props.searchHandler}
      />
    </div>
  );
}
