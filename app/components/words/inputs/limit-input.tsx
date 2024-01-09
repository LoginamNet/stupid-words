import { SearchParams } from "../interfaces";

interface ComponentProps {
  searchParams: SearchParams;
  searchHandler: (
    immediatExecution: boolean,
    paramToChange: string,
    selectedValue: string
  ) => void;
}

export default function LimitInputs(props: ComponentProps) {
  const limits = [5, 10, 15, 30, 50, 100];

  return (
    <label>
      На странице:
      <select
        name="sort-input"
        id="sort-input"
        value={props.searchParams.limit || 10}
        onChange={(e) => {
          props.searchHandler(true, "limit", e.currentTarget.value);
        }}
      >
        {limits.map((limit, key) => (
          <option key={key} value={limit}>
            {limit}
          </option>
        ))}
      </select>
    </label>
  );
}
