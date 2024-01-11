import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { SearchParams, StupidWords } from "../interfaces";

import styles from "./pagination.module.css";

interface ComponentProps {
  words: StupidWords | undefined;
  isLoading: boolean;
  searchParams: SearchParams;
  currentPage: number;
  handleSearch: (
    updateQuery: boolean,
    updateParams: boolean,
    goToFirtsPage: boolean,
    keyToUpdate?: string,
    valueToSet?: string
  ) => void;
}

export default function Pagination(props: ComponentProps) {
  const { currentPage } = props;

  const handlePageSelect = (page: number) => {
    props.handleSearch(true, true, false, "page", `${page}`);
  };

  return props.words ? (
    <div
      className={`${styles.button_box} ${props.isLoading && styles.disabled}`}
    >
      <button
        className={styles.button}
        onClick={() => handlePageSelect(1)}
      >{`<<`}</button>
      {currentPage - 1 > 1 && <span>...</span>}
      {currentPage - 1 > 0 && (
        <button
          className={styles.button}
          onClick={() => handlePageSelect(currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      )}
      <button className={styles.current}>{currentPage}</button>
      {currentPage + 1 <=
        Math.ceil(
          Number(props.words?.total) / (Number(props.searchParams.limit) || 10)
        ) && (
        <button
          className={styles.button}
          onClick={() => handlePageSelect(currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      )}
      {currentPage + 1 <
        Math.ceil(
          Number(props.words?.total) / (Number(props.searchParams.limit) || 10)
        ) && <span>...</span>}
      <button
        className={styles.button}
        onClick={() =>
          handlePageSelect(
            Math.ceil(
              Number(props.words?.total) /
                (Number(props.searchParams.limit) || 10)
            )
          )
        }
      >{`>>`}</button>
    </div>
  ) : (
    <div className={styles.button_box}>Считаем странички...</div>
  );
}
