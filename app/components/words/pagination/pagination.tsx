import { useEffect, useState } from "react";

import { SearchParams, StupidWords } from "../interfaces";

import styles from "./pagination.module.css";

interface ComponentProps {
  words: StupidWords | undefined;
  isLoading: boolean;
  searchParams: SearchParams;
  searchHandler: (
    immediatExecution: boolean,
    paramToChange: string,
    selectedValue: string
  ) => void;
}

export default function Pagination(props: ComponentProps) {
  const [currentPage, setCurrentPage] = useState<number | undefined>();

  useEffect(() => {
    setCurrentPage(Number(props.searchParams.page));
  }, [props.searchParams.page]);

  return props.words && currentPage ? (
    <div className={styles.button_box}>
      <button
        className={styles.button}
        onClick={() => props.searchHandler(true, "page", "1")}
      >{`<<`}</button>
      {currentPage - 1 > 1 && <span>...</span>}
      {currentPage - 1 > 0 && (
        <button
          className={styles.button}
          onClick={() =>
            props.searchHandler(true, "page", `${currentPage - 1}`)
          }
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
          onClick={() =>
            props.searchHandler(true, "page", `${currentPage + 1}`)
          }
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
          props.searchHandler(
            true,
            "page",
            `${Math.ceil(
              Number(props.words?.total) /
                (Number(props.searchParams.limit) || 10)
            )}`
          )
        }
      >{`>>`}</button>
    </div>
  ) : (
    <div>Считаем странички...</div>
  );
}
