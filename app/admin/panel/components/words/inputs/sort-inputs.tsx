import { SearchParams } from "../interfaces";

interface ComponentProps {
  searchParams: SearchParams;
  handleNewSearchParams: (newParams: SearchParams) => void;
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
          props.handleNewSearchParams({
            ...props.searchParams,
            sort: e.currentTarget.value,
            page: "1",
          });
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
