import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { SearchParams, StupidWords } from "../interfaces";

interface ComponentProps {
  words: StupidWords | undefined;
  isLoading: boolean;
  searchParams: SearchParams;
  searchHandler: (paramToChange: string, selectedValue: string) => void;
}

export default function Pagination(props: ComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(Number(props.searchParams.page));
  }, [props.searchParams.page]);

  return props.words ? (
    <div>
      <button onClick={() => props.searchHandler("page", "1")}>{`<<`}</button>
      {currentPage - 1 > 0 && (
        <button
          onClick={() => {
            console.log(currentPage, props.searchParams.page);
            props.searchHandler("page", `${currentPage - 1}`);
          }}
        >
          {currentPage - 1}
        </button>
      )}
      <button onClick={() => console.log(props.searchParams.page)}>
        {currentPage || 1}
      </button>
      {currentPage + 1 <=
        Math.ceil(
          Number(props.words?.total) / (Number(props.searchParams.limit) || 10)
        ) && (
        <button
          onClick={() => {
            console.log(props.searchParams.page);
            props.searchHandler("page", `${currentPage + 1}`);
          }}
        >
          {currentPage + 1}
        </button>
      )}
      <button
        onClick={() =>
          props.searchHandler(
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
