import { SearchParams } from "./interfaces";

export const setSearchQuery = (searchParams: SearchParams) => {
  return Object.entries(searchParams)
    .filter((el) => el[1])
    .map((el) => `${el[0]}=${el[1]}`)
    .join("&");
};
