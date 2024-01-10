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

export default function LimitInputs(props: ComponentProps) {
  const { handleQuery } = props;
  const limits = [5, 10, 15, 30, 50, 100];
  const [currentLimit, setCurrentLimit] = useState<string | undefined>("");

  const handleLimitInput = (e: ChangeEvent<HTMLSelectElement>) => {
    props.setSearchParams({
      ...props.searchParams,
      limit: e.currentTarget.value,
      page: "1",
    });
  };

  useEffect(() => {
    if (currentLimit !== props.searchParams.limit) {
      setCurrentLimit(props.searchParams.limit);
      handleQuery();
    }
  }, [currentLimit, props.searchParams.limit, handleQuery]);

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
