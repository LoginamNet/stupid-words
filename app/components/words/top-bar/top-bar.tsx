import { Dispatch, SetStateAction } from "react";

import WordInput from "../inputs/word-input";
import SortInputs from "../inputs/sort-inputs";

import { SearchParams } from "../interfaces";

import styles from "./top-bar.module.css";
import LimitInputs from "../inputs/limit-input";

interface ComponentProps {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  setWord(): void;
  setLimit(): void;
  setSort(): void;
  getData(): Promise<void>;
}

export default function TopBar(props: ComponentProps) {
  return (
    <div className={styles.topBar}>
      <WordInput
        searchParams={props.searchParams}
        setSearchParams={props.setSearchParams}
        setWord={props.setWord}
        getData={props.getData}
      />
      <LimitInputs
        searchParams={props.searchParams}
        setSearchParams={props.setSearchParams}
        setLimit={props.setLimit}
        getData={props.getData}
      />
      <SortInputs
        searchParams={props.searchParams}
        setSearchParams={props.setSearchParams}
        setSort={props.setSort}
        getData={props.getData}
      />
    </div>
  );
}
