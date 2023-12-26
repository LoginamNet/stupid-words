import { SearchParams } from "./interfaces";

const createSearchQuery = (searchParams: SearchParams) => {
  return Object.entries(searchParams)
    .filter((el) => el[1])
    .map((el) => `${el[0]}=${el[1]}`)
    .join("&");
};

const setWordType = (givenType: string) => {
  const initialTypes = [
    { type: "noun", name: "сущ." },
    { type: "verb", name: "глаг." },
    { type: "exp", name: "выраж." },
    { type: "adj", name: "прил." },
  ];

  return initialTypes.find((el) => el.type === givenType)?.name || "неизв.";
};

export { createSearchQuery, setWordType };
