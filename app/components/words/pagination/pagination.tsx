import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { SearchParams, StupidWords } from "../interfaces";

interface ComponentProps {
  words: StupidWords | undefined;
  isLoading: boolean;
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  setPage(): void;
  getData(): Promise<void>;
}

export default function Pagination(props: ComponentProps) {
  const { setPage, getData } = props;

  const handlePageSelect = (selectedPage: string) => {
    props.setSearchParams({
      ...props.searchParams,
      page: selectedPage,
    });
  };

  useEffect(() => {
    setPage();
    getData();
  }, [getData, props.searchParams.page, setPage]);

  return props.words ? (
    <div>
      <button onClick={() => handlePageSelect("1")}>{`<<`}</button>
      {Number(props.searchParams.page) - 1 > 0 && (
        <button
          onClick={() =>
            handlePageSelect(`${Number(props.searchParams.page) - 1}`)
          }
        >
          {Number(props.searchParams.page) - 1}
        </button>
      )}
      <button>{Number(props.searchParams.page) || 1}</button>
      {Number(props.searchParams.page) + 1 <=
        Math.ceil(
          Number(props.words?.total) / (Number(props.searchParams.limit) || 10)
        ) && (
        <button
          onClick={() =>
            handlePageSelect(`${Number(props.searchParams.page) + 1}`)
          }
        >
          {Number(props.searchParams.page) + 1}
        </button>
      )}
      <button
        onClick={() =>
          handlePageSelect(
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
