import { SearchParams } from "../interfaces";

interface ComponentProps {
  searchParams: SearchParams;
  handleSearch: (
    updateQuery: boolean,
    updateParams: boolean,
    goToFirtsPage: boolean,
    keyToUpdate?: string,
    valueToSet?: string
  ) => void;
}

export default function SortInputs(props: ComponentProps) {
  const sortOrders = [
    { order: "word-asc", name: "алфавиту (а-я)" },
    { order: "word-desc", name: "алфавиту (я-а)" },
    { order: "updatedAt-asc", name: "дате ↓" },
    { order: "updatedAt-desc", name: "дате ↑" },
    { order: "likes-asc", name: "лайкам ↓" },
    { order: "likes-desc", name: "лайкам ↑" },
  ];

  return (
    <label>
      Сортировать по:
      <select
        name="sort-input"
        id="sort-input"
        value={props.searchParams.sort}
        onChange={(e) => {
          props.handleSearch(true, true, true, "sort", e.currentTarget.value);
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
