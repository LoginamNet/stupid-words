import { Dispatch, SetStateAction } from "react";

import WordInput from "../inputs/word-input";
import SortInputs from "../inputs/sort-inputs";

import { SearchParams } from "../interfaces";

import styles from "./top-bar.module.css";

interface ComponentProps {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  setWord(): void;
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
      <SortInputs
        searchParams={props.searchParams}
        setSearchParams={props.setSearchParams}
        setSort={props.setSort}
        getData={props.getData}
      />
    </div>
  );
}
