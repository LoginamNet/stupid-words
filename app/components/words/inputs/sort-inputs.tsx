import { SearchParams } from "../interfaces";

interface ComponentProps {
  searchParams: SearchParams;
  searchHandler: (paramToChange: string, selectedValue: string) => void;
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

  return (
    <label>
      Сортирнуть:
      <select
        name="sort-input"
        id="sort-input"
        value={props.searchParams.sort}
        onChange={(e) => {
          props.searchHandler("sort", e.currentTarget.value);
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
