import WordInput from "../inputs/word-input";
import LimitInputs from "../inputs/limit-input";
import SortInputs from "../inputs/sort-inputs";
import UpdateButton from "../buttons/update-button";

import { SearchParams, StupidWords } from "../interfaces";

import styles from "./top-bar.module.css";

interface ComponentProps {
  words: StupidWords | undefined;
  isLoading: boolean;
  searchParams: SearchParams;
  handleSearch: (
    updateQuery: boolean,
    updateParams: boolean,
    goToFirtsPage: boolean,
    keyToUpdate?: string,
    valueToSet?: string
  ) => void;
  getData: () => Promise<void>;
}

export default function TopBar(props: ComponentProps) {
  return (
    <div
      className={`${styles.topBar} ${
        (props.isLoading || !props.words) && styles.disabled
      }`}
    >
      <WordInput handleSearch={props.handleSearch} />
      <LimitInputs
        searchParams={props.searchParams}
        handleSearch={props.handleSearch}
      />
      <SortInputs
        searchParams={props.searchParams}
        handleSearch={props.handleSearch}
      />
      <UpdateButton getData={props.getData} />
    </div>
  );
}
