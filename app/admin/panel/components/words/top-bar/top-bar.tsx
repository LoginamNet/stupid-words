import WordInput from "../inputs/word-input";
import LimitInputs from "../inputs/limit-input";
import SortInputs from "../inputs/sort-inputs";
import UpdateButton from "../buttons/update-button";

import { FilterParams, SearchParams, StupidWords } from "../interfaces";

import styles from "./top-bar.module.css";

interface ComponentProps {
  words: StupidWords | undefined;
  isLoading: boolean;
  searchParams: SearchParams;
  handleNewSearchParams: (newParams: SearchParams | FilterParams) => void;
  getData: () => Promise<void>;
}

export default function TopBar(props: ComponentProps) {
  return (
    <div
      className={`${styles.topBar} ${
        (props.isLoading || !props.words) && styles.disabled
      }`}
    >
      <WordInput
        searchParams={props.searchParams}
        handleNewSearchParams={props.handleNewSearchParams}
      />
      <LimitInputs
        searchParams={props.searchParams}
        handleNewSearchParams={props.handleNewSearchParams}
      />
      <SortInputs
        searchParams={props.searchParams}
        handleNewSearchParams={props.handleNewSearchParams}
      />
      <UpdateButton getData={props.getData} />
    </div>
  );
}
