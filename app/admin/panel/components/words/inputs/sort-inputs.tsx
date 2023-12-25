import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

import { SearchParams } from "../interfaces";

interface ComponentProps {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
}

export default function SortInputs(props: ComponentProps) {
  const sortOrders = [
    { order: "word-asc", name: "по алфавиту (а-я)" },
    { order: "word-desc", name: "по алфавиту (я-а)" },
    { order: "updatedAt-asc", name: "по дате ↓" },
    { order: "updatedAt-desc", name: "по дате ↑" },
    { order: "likes-asc", name: "по лайкам ↓" },
    { order: "likes-desc", name: "по лайкам ↑" },
  ];

  const handleSortInput = (e: ChangeEvent<HTMLSelectElement>) => {
    props.setSearchParams({
      ...props.searchParams,
      sort: e.currentTarget.value,
    });
  };

  return (
    <label>
      Сортирнуть:
      <select
        name="sort-input"
        id="sort-input"
        value={props.searchParams.sort}
        onChange={(e) => {
          handleSortInput(e);
        }}
      >
        {sortOrders.map((sort, key) => (
          <option key={key} value={sort.order}>
            {sort.name}
          </option>
        ))}
      </select>
    </label>
  );
}
