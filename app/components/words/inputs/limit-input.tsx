import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";

import { SearchParams } from "../interfaces";

interface ComponentProps {
  searchParams: SearchParams;
  setSearchParams: Dispatch<SetStateAction<SearchParams>>;
  setLimit(): void;
  getData(): Promise<void>;
}

export default function LimitInputs(props: ComponentProps) {
  const { setLimit, getData } = props;

  const limits = [5, 10, 15, 30, 50, 100];

  const handleLimitInput = (e: ChangeEvent<HTMLSelectElement>) => {
    props.setSearchParams({
      ...props.searchParams,
      limit: e.currentTarget.value,
    });
  };

  useEffect(() => {
    setLimit();
    getData();
  }, [getData, props.searchParams.limit, setLimit]);

  return (
    <label>
      На странице:
      <select
        name="sort-input"
        id="sort-input"
        value={props.searchParams.limit || 10}
        onChange={(e) => {
          handleLimitInput(e);
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
