import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { SearchParams } from "../interfaces";

interface ComponentProps {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  handleQuery: () => void;
}

export default function SortInputs(props: ComponentProps) {
  const { handleQuery } = props;
  const [currentSortOrder, setCurrentSortOrder] = useState<string | undefined>(
    ""
  );
  const sortOrders = [
    { order: "word-asc", name: "алфавиту (а-я)" },
    { order: "word-desc", name: "лфавиту (я-а)" },
    { order: "updatedAt-asc", name: "дате ↓" },
    { order: "updatedAt-desc", name: "дате ↑" },
    { order: "likes-asc", name: "лайкам ↓" },
    { order: "likes-desc", name: "лайкам ↑" },
  ];

  const handleSortInput = (e: ChangeEvent<HTMLSelectElement>) => {
    props.setSearchParams({
      ...props.searchParams,
      sort: e.currentTarget.value,
      page: "1",
    });
  };

  useEffect(() => {
    if (currentSortOrder !== props.searchParams.sort) {
      setCurrentSortOrder(props.searchParams.sort);
      handleQuery();
    }
  }, [currentSortOrder, props.searchParams.sort, handleQuery]);

  return (
    <label>
      Сортировать по:
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
