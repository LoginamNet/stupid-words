import { Key } from "react";

import { StupidWords, Word } from "../interfaces";

import styles from "./List.module.css";

interface ComponentProps {
  words: StupidWords | undefined;
  isLoading: boolean;
}

export default function List(props: ComponentProps) {
  return (
    <div className={styles.list}>
      {!props.words || props.isLoading ? (
        <p>Грузим словечки...</p>
      ) : props.words?.data.length ? (
        props.words.data.map((el: Word, key: Key | null | undefined) => (
          <div key={key}>
            <h3>{el.word}</h3>
            <p>{el.text}</p>
            <span>{el.mature === "true" ? "18+ контент" : "Детям можно"}</span>
          </div>
        ))
      ) : (
        <p>К сожалению (или нет), такого слова не существует</p>
      )}
    </div>
  );
}
