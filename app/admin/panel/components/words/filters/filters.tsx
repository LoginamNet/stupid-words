import MatureInputs from "../inputs/mature-inputs";
import TypeInputs from "../inputs/type-inputs";

import { SearchParams, StupidWords } from "../interfaces";

import styles from "./filters.module.css";

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
}

export default function Filters(props: ComponentProps) {
  return (
    <aside
      className={`${styles.filters} ${
        (props.isLoading || !props.words) && styles.disabled
      }`}
    >
      <MatureInputs
        searchParams={props.searchParams}
        handleSearch={props.handleSearch}
      />
      <TypeInputs
        searchParams={props.searchParams}
        handleSearch={props.handleSearch}
      />
      <input
        type="button"
        value="Применить фильтры"
        onClick={() => {
          props.handleSearch(true, false, true);
        }}
      ></input>
    </aside>
  );
}
